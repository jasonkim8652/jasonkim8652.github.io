---
title:  "Highly accurate protein sturcutre prediction with AlphaFold: Structure Module"
classes: wide
date:   2023-12-05 04:16:12 +0900
categories: 
  - proteinstructure
tags:
  - AF2
---

## Prior Knowledge

### Gram-Schmidt Process

Gram-schmidt process is a method to orthonormalize the set of vectors to make a basis set of inner product space. We could make any vector into orthogonal set of vector, which is linearly independent. We could use projection to make this set. Further information is available in [Wikipedia](https://en.wikipedia.org/wiki/Gram–Schmidt_process).
![image-20231205223901433](https://jasonkim8652.github.io/assets/images/AF2_structure_1.png)

### Quaternion

Quaternion has same function as rotation matrix, but it is much more efficient in computing environment. We can save memory when we use Quaternion compared to rotation matrix(4 float vs 16 float) and operation times when we apply it(16 FLOPS vs 256 FLOPS). This is similar to complex plane: The only difference is that there are more axis. We can easily exchange the Quaternion to rotation matrix. Further information is available in [Wikipedia](https://en.wikipedia.org/wiki/Quaternions_and_spatial_rotation).

![AF2_structure2](https://jasonkim8652.github.io/assets/images/AF2_structure_2.png)

### Equivariant vs Invariant

For the transformation $T$ and function $f$, if the result of the function does not change after I apply transformation, it is Invariant. On the other hands, if the result of the function change as much as I apply transformation, it is equivariant. It could be expressed as mathematical equation following below. 

$T$-Equivariant : $ f(T(x)) = T(f(x)) $

$T$-Invariant: $f(T(x)) = f(x) $

## Overview

The structure module match the representation created by the Evoformer stack to concrete 3D atom coordinates. The key point of Structure Module is

> While updating single representation from MSA(1D), we use inductive bias from pair representation(2D) and global coordinates of residue gas(3D)

Before we start on, we need to clarify the relationship between the Transformation matrix , global coordinates, and local coordinates. At the begginning, the backbone frames(= Transformation matrix) is initialized to an identity transform. This is why we call this system as **black hole initialization**. We represent each residue gas frame via a tuple $T_i :=(R_i, \vec{t_i}) $. This tuple is an euclidean transforms from the local frame to a glovbal reference frame. We can express the relationship between local coordinates and global coordinates as following below. 

![AF2_structure3](https://jasonkim8652.github.io/assets/images/AF2_structure_3.png)

Therefore, we need to find out proper $ T_i $ for residue gas firstly, which would be done in Invariant Point Attention module(IPA). After on, we need to find out the side chain orientation using the information of $T_i $. For the second job, we only need to find out the torsion angle becuase we assume that each residue is rigid body. Therefore, we do not need to check the bond length. Following table shows rigid groups for constructing all atoms from given torsion angles. Boxes highlight groups that are symmetric under 180 degree rotation. 

![AF2_structure4](https://jasonkim8652.github.io/assets/images/AF2_structure_4.png)

The predicted torsion angles should be matched to points on the unit circle via normalization whenever they are used as angles. Therefore, to avoid degenerate value, there are auxiliary loss to make this vector norm as 1. 

During training, the last step of each layer computes auxiliary loss for the current 3D structure. This intermediate FAPE loss operates only on the backbone frames and C$\alpha$ atom position. While calculating loss, since there are 180 degree rotation symmetry of some rigid groups, we need to take care of alternative answer. Furthermore, there are steps that zero the gradient into the orientation component of the rigid bodies between iterations, so any iteration is optimized to find an optimal orientation for the structure in the current iterations, but is not concerned by having an orientation more suitable for the next iteration. This strategy makes training stable. 

Finally, the model predictes its confidence in form of a predicted lDDT score per residue. This score is trained with the true per-residue lDDT-C$\alpha$ score computed from the predicted structure and the ground truth. 

Following below is total pseudo code of structure module. 

![AF2_structure5](https://jasonkim8652.github.io/assets/images/AF2_structure_5.png)

## Construction of frames from ground truth atom positions

We firstly need to compute the local frame. We would use gram-schmidt process. For each residue, we use N as $\vec{x_1}$, C$\alpha$ as $\vec{x_2}$ and C as $\vec{x_3}$, so the frame has C$\alpha$ at the centre. 

![AF2_structure6](https://jasonkim8652.github.io/assets/images/AF2_structure_6.png)

## Invariant point attention(IPA)

Following figure represents how IPA block works. 

![AF2_structure7](https://jasonkim8652.github.io/assets/images/AF2_structure_7.png)

Let's take a look at how this works by looking at pseudocode. 

![AF2_structure8](https://jasonkim8652.github.io/assets/images/AF2_structure_8.png)

Before we start on, we need to know what we want to do in this IPA block. We want to mix up all the information from MSA single representation, pair representation from Evoformer block and 3D coordinate information, while keeping global transformation invariant. We need to attention on the line 7 of the pesudocode, which calculate the attention coefficient. The first term on the right hand is just same as calculating self-attention coefficient of MSA single representation. The second term represents the inductive bias to this self-attention coefficient, which has information about  pair representation. (comes from line 4) These two terms are quite straightforward becuase we want to mix up the information.

The problem is last term. Before we look at the last term, we need to take a look at the meaning of the line 2,3. These lines project the single representation into 3D coordinate. Since it came out from the single representation, these are local coordinate. If we want to get the global coordinate, we need to apply transformation $T_i$. Therefore, the term inside the L2 norm is actually the distance between two residue frame in global coordinate. This inductive bias term implies that we would give higher attention coefficient if these two residues are close to each other in 3D coordinate, which is quite straight forward even comparing with the attention mechanism. 

After calculating the attention coefficient, at line 8 and 9, we would get the output from the weighted sum of pair representation and single representation using attention coefficient. Moreover, since we use the global coordinate as inductive bias when we calcualte the attention coefficient, we use the global coordinate at line 10. The output of weighted sum would also represent global coordinate but we want updated single represenation keep information about local coordiante. Therefore, we did inverse transformation to get the output vector. At the end, we concat all these information into single vector. 

Let's take a look at why we only update single representation. Since it is residual gas, we do not want to constrain each residue frame because of other residues. By only updating and concentrating information into single representation, not the pair representation or transformation matrx, we can keep this residual gas assumption. 

Let's prove that this output vector is invariant to global transformation. We first need to check attention coefficient is invariant. Since L2-norm of a vector is invariant, proof is quite  trivial. 

![AF2_structure9](https://jasonkim8652.github.io/assets/images/AF2_structure_9.png)

We also need to check the output vector is invariant. Since the terms with Sigma is just weighted sum of each vector, we can take $T_{global}$ outside of the Sigma. This is the key point of the proof. The others are straightforward. 

![AF2_structure10](https://jasonkim8652.github.io/assets/images/AF2_structure_10.png)

## Backbone update

Since we've update the single representation using the other resiude's 3D coordinate information, we can get the 3D backbone information by using single linear layer. We can predict a quaternion for the rotation and a vector for the translation of each backbone frame. 

![AF2_structure11](https://jasonkim8652.github.io/assets/images/AF2_structure_11.png)



## Compute all atom coordinates

We could compute the atom coordinates by applying the torsion angles to the corresponding amino acid structure with idealized bond angles and bond lengths. 

![AF2_structure12](https://jasonkim8652.github.io/assets/images/AF2_structure_12.png)

## Rename symmetric ground truth atoms

Since there are 180 degree-rotation-symmetry for some of the rigid groups, we need to resolve the name ambiguous to calcualte loss correctly. 

![AF2_structure13](https://jasonkim8652.github.io/assets/images/AF2_structure_13.png)

## Amber relaxation

We relax our predicted models by an iterative restrained energy minimization procedure. At each round, we perform minimization of the AMBER99SB force field with additional harmonic restraints that keep the system near its input structure. We then remove restraints form all atoms within these residues and perform restrained minimzation once again, starting from the minimized structure of the previous iteration. This process is repeated until all violates are resolved. 

## References

1. ​    Jumper, J. *et al.* Highly accurate protein structure prediction with AlphaFold. *Nature* **596**, 583–589 (2021).  
