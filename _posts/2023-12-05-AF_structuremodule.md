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

## Invariant point attention(IPA)

## Backbone update

## Compute all atom coordinates

## Rename symmetric ground truth atoms

## Amber relaxation

## References

1. ​    Jumper, J. *et al.* Highly accurate protein structure prediction with AlphaFold. *Nature* **596**, 583–589 (2021).  
