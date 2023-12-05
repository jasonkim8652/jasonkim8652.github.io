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

## Construction of frames from ground truth atom positions

## Invariant point attention(IPA)

## Backbone update

## Compute all atom coordinates

## Rename symmetric ground truth atoms

## Amber relaxation

## References

1. ​    Jumper, J. *et al.* Highly accurate protein structure prediction with AlphaFold. *Nature* **596**, 583–589 (2021).  
