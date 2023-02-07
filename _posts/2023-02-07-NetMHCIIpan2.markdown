---
title:  "NetMHCIIpan-2.0 - Improved pan-specific HLA-DR predictions using a novel concurrent alignment and weight optimization training procedure(2010)"
classes: wide
date:   2023-02-07 11:31:24 +0900
categories: 
  - Immunogenecity
tags:
  - HLA-class2
---

## Materials and Methods

### Data

Quantitative peptide binding data covering 24 HLA-DR molecules were obtained fromthe IEDB database and combined with data from an in-house database containing MHC class II peptide binding affinity data obtained from a high-throughput peptide-binding screening assay described earlier. The peptide coverage in the data set varied from a maximal coverage of 7685 peptide binding measurments for the DRB1\*0101 allele to a minimal coverage of only 30 peptide binding measurements for the DRB1\*1404 alele.

### Method

The pan-specific NetMHCIIpan-2.0 method is a hybrid of the earlier published methods for pan-specific for MHC class I and class II binding, NetMHCpan and NetMHCIIpan, and the NN-align method recently published for allele-specific MHC class II binding predictions. The overall method architecture is similar to the NN-align method, and the manner in which the MHC polymorphism method is incorporated is similar to that of the NetMHCpan and NetMHCIIpan methods.

The method was implemented as a conventional feed-forward artificial neural network. Like the NN-align method, the method consists of a two-step procedure that simultaneously consists of a two-step procedure that simultaneously estimates the optimal peptide binding register(core) and network weight configuration. Initially, all network weights were assigned random values. Given this set of network weights, the core of a given peptide was identified as the highest scoring of all nonamers contained within the peptide. The score of a nonamer peptide was calculated using the conventional feed-forward algorithm. The network weights were updated using gradient descent back-propagation. Given a peptide core alignment, the weights were updated to lower the sum of squared errors between the predicted binding score and the measured binding affinity target value.

A peptide core was presented to the network as described for the NN-align method including encoding of peptide flanking regions (PFR), PFR legnth and the peptide length. The MHC environment defining the peptide binding strength was implemented in terms of the MHC pseudo sequence constructed from 21 polymorphic amino acid positions in potential contact with the bound peptides.

### Leave-one-out (LOO) network training and benchmark

Since many of the peptides in the training data have been measured for binding affinities to multiple alleles, the above LOO experiment can lead to a significant overestimation of the performance for a given prediction method. To reduce this bias, a second type of LOO experiment was conducted where all data representing a given peptide was excluded from the training of the prediction method. That is, if a given peptide was measured against multiple alleles including the allele in question, all these measurements were excluded from the LOO training.

## Results

### Pan-specific versus allele-specific predictions

In contrast to allele-specific MHC class II prediction methods, the pan-specific method outlined here is proposed to benefit from information even from alleles convered by limited binding data. 

![fig1](https://jasonkim8652.github.io/assets/images/NetMHC2pan2_1.png)

From the table, it is apparent that the NetMHCIIpan-2.0 method significantly outperforms both the NN-align and TEPITOPE methods. 

### NetMHCPanII-1.0 versus NetMHCpanII-2.0

In the pan-specific training algorithm implemented in the NetMHCIIpan-2.0 method, alignment and binding affinity prediction is performed simultaneously. To further demonstrate that this approach does indeed outperform the NetMHCIIpan-1.0 method where the two steps were decoupled, we performed a sereies of LOO experiments. 

![fig2](https://jasonkim8652.github.io/assets/images/NetMHC2pan2_2.png)

These results thus demonstrate, that the training algorithm implemented in the NetMHCIIpan-2.0 method leads to significantly improved prediction accruacy compared to the algorithm employed in the NetMHCIIpan-1.0 method.

Next, we investigated to what extent expanding the peptide data set with broader allelic coverage and more binding data would lead to an improved predictive performance. To do this, we conducted a second series of LOO experiments comparing the LOO predictive performance of the NetMHCIIpan-2.0 method when trained on the old data set covering 14 HLA-DR allele to its performance when trained on the extended data set covering 24 HLA-DR alleles. 

The results clearly demonstrate that the enrichment of novel peptide binding data with a broader allelic coverage leads to an improved predictive performance of the pan-specific prediction method. We can quantify to what degree an allele will benefit from other alleles being present in the training data by calcualting its distance to the nearest neighbor in the training data.

### Discussion

Devlopment of accurate prediction algorithms for MHC class II binding is complicated by the fact that the MHC class II molecule has an open binding cleft, and that peptide binders are accomodated in the binding cleft in a binding register that a priori is unknown. Training of methods for prediction of peptide-MHC class II binding hence rely on either a two step procedure where first the binding register is identified and next the aligned peptides are used to train the binding prediction algorithm or a procedure where these two steps are integrated and performed simultaneously. The method thus demonstrates great potential for efficient boosting of the accuracy of MHC class II binding prediction, as accurate predictions can be achieved for novel alleles at a highly reduced experimental cost, and pan-specific binding predictions can be obtained for all alleles with known protien sequence by a method trained using data with limited allelic coverage.

For MHC class I, we have earlier demonstrated that a pan-specific predictor can benefit from being trained on cross-loci(and cross-species) peptide binding data. The dvelopment of a cross-loci model for HLA class II is complicated by the fact that the HL-DRA molecule is close to monomorphic. This is in contrast to HLA-DP and HLA-DQ where both the $\alpha$ and $\beta$ chains are highly polymorphic. Moreover, the structures of the HLA molecules are less conseved across the three loci for class II compared to class I, and finally very limited peptide binding data have been generated characterizing the different  HLA-DP and DQ molecules.  Large amounts of peptide binding data for the HLA-DP and HLA-DQ loci will most likely become available in the near future providing a broader allelic coverage, and future evaluations will demonstrate if also MHC class II binding prediction algorithms using training algorithms like the one outlined in this work, will benefit from pan-specific training across the different loci.

## Reference

1. Nielsen, Morten, Claus Lundegaard, and Ole Lund. "Prediction of MHC class II binding affinity using SMM-align, a novel stabilization matrix alignment method." BMC bioinformatics 8.1 (2007): 1-12.