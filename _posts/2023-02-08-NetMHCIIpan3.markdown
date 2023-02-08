---
title:  "NetMHCIIpan-3.0, a common pan-specific MHC class II prediction method including all three human MHC class II isotypes, HLA-DR, HLA-DP and HLA-DQ"
classes: wide
date:   2023-02-08 11:31:24 +0900
categories: 
  - Immunogenecity
tags:
  - HLA-class2
---

## Materials and Methods

### Data sets

Training data used to develop the method consisted of quantitative MHC class II peptide-binding data retrieved from the IEDB database. In total, the training data set comprises 52,062 data points covering 24 HLA-DR, 5 HLA-DP, 6 HLA-DQ and 2 mouse (H-2) molecules. 

### Mapping of MHC molecules

For constructing the NetMHCIIpan method, all MHC class II molecules need to be mapped to a common reference sequence. This is done by aligning alpha and beta chain sequences of all MHC molecules to the reference sequences, DRA101\*01 and DRB101\*01. For HLA-DR molecules, the mapping on a sequence level is in agreement with tthe mapping on the structural level. On the other hand, HLA-DP and HLA-DQ molecules demonstrate minor variations from HLA-DR in the peptide-binding domain in both rhe alpha and beta chains. To evaluate the structural impact of these variations, we employed the analysis described below. The analysis is based on the five available structures solved for HLA-DP and HLA-DQ molecules, which are compared to a representative high-resolution HLA-DR structure selected among the large number of structures available for HLA-DR molecules.

![fig1](https://jasonkim8652.github.io/assets/images/NetMHCIIpan3_1.png)

During the analysis, an important variation was observed for HLA-DQ molecules only and was investigated in more detail. We observed that sequence belonging to the HLA-DQA1\*04, HLA-DQA1\*05 and HLA-DQA1\*06 serotype groups display a single amino acid deletion, which from a pure sequence point of view, correspons to position 53 in HLA-DRA. However, this leads to a shift of the preceding residues in the DQA sequences, which now realign with DRA positions 52 and 53. Although the deletion affects the orientation of the short $\alpha$-helical segment adn the loop (residues 45-52) next to the P1 binding pocket, these changes have negligible impact on peptide binding, as the reorientation appears to be a localised change, and very few contacts with the peptide are observed within the area. Due to the minor impact of the area discussed above to the binding of the peptide, an automated sequence alignment approach was chosen to identify the deletion in HLA-DQ sequences. Pair-wise sequence alignments were made and visualized using ClustalW. Each HLA-DQ sequence was aligned one by one to the reference sequence of HLA-DR. **The alignments demonstrated that for all the HLA-DQ sequences that have a deletion, the deletion is consistently found in the same place.**

### MHC class II pseudo sequence

Among the interacting residues, only those found to be polymorphic across the sequences of MHC molecules used for the training of the method were considered. The final pseudo sequence is composed of 15 residues from the alpha chain and 19 residues from the beta chain.

## Results

### NetMHCIIpan-3.0 method's new approach for getting pseudo sequence

In the most recent pan-specific MHC class II prediction method, NetMHCIIpan-2.0, the pseudo sequence is composed of 21 amino acids from positions within the HLA-DR beta chain that are in potential contact with a peptide using a 4.0 $\AA$ distance cut-off and polymorphic across the set of sequenced MHC class II molecules available at the time of the study. For the NetMHCIIpan-3.0 method described here, the pseudo sequence contains 19 residues from the beta chain of MHC molecules. The main difference between two pseudo sequence obtaining approaches resulting into different number of pseudo sequence positions is that the NetMHCIIpan-3.0 considers polymorphism across the sequences of MHC molecules from the training set only.

![fig2](https://jasonkim8652.github.io/assets/images/NetMHCIIpan3_2.png)

The results in table above demonstrate that the new approach for obtaining the pseudo seuquence leads to a significantly imrpoved predictive performance compared to the original approach when the pan-specific training approach is appleid to the HLA_DR data set.

### Per-locus training versus cross-loci training

To the best of our knowledge, all pan-specific prediction methods for HLA class II molecules available up to data are limited to HLA-DR. In this sutdy, we introduce an approach for combining residues from the alpha and beta chains into one pseudo sequence. The procedure for the pseudosequence construction is universal to all MHC class II complexes allowing the pan-specific method to be trained n a cross-loci/cross-species manner arriving at one common method suitable for all MHC class II molecules.

The overall performance of the two training approaches is similar. For HLA-DR, the predictive performance improved when training in a cross loci manner compared to per-locus training. For HLA-DQ and HLA-DP, the performance on the other hand is slightly reduced. This reduction is, however, only significatn for HLA-DQ and only when measuring AUC performance values.

### Discussion and conclusion

From the results included here, one can notice that HLA-DP molecules demonstrate higher performance values compared with DR and DQ performances. As this high performance is maintained also for the allele-specific NN-align approach, the high performance is not due to the fact that DP molecules are found to be very close to each other in terms of pseudo sequence similarity and function. The reason for this different performance is rather related to the differences within distributions of the binding data available for each locus. The HLA-DP data are well separated with the majority of the data being either strong or very weak binders. This is in strong contrast to the data for DQ and DR mmolecules where the majority of the data have intermediate binding affinity. This difference in binding affinity distribution strongly influences the predictive performance, as well-separated data sets in general achieve a higher predictive performance.

The analysis performed here is the first study suggesting reduction of polymorphism of HLA class II molecules by definition of clusters based on similarities in predicted functional binding specificities. Such clustering builds a base for facilitating identification of T helper cell epitopes within different ethinic groups having a high value in the design of epitope-based vaccines.

No significant improvement was found between the per-loci and cross-loci trained method. However, this is most likely due to the very low number of HLA-DQ an HLA-DP molecules included in the study and is expected to change with the inclusion of more data covering HLA-DP and HLA-DQ molecules. 

## Reference

1. Nielsen, Morten, Claus Lundegaard, and Ole Lund. "Prediction of MHC class II binding affinity using SMM-align, a novel stabilization matrix alignment method." BMC bioinformatics 8.1 (2007): 1-12.