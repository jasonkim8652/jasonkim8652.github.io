---
title:  "Quantitative Predictions of Peptide Binding to Any HLA-DR molecule of known sequence: NetMHCIIPan(2008)"
classes: wide
date:   2023-01-31 16:31:24 +0900
categories: 
  - immunogenecity
tags:
  - HLA-class2
---
## Introduction

While peptides derived from foreign, intracellulear proteins and presented in complex with MHC class I molecules can trigger a response from cytoxic T lymphocytes(CTL), MHC class II molecules present peptides derived from proteins taken up from the extracellular environment. They stimulate cellular and humoral immunity against pathogenic microorganisms through the actions of helper T lymphocytes. 

MHC molecules are extremely polymorphic. THe number of identified human MHC(HLA) molecules has surpassed 1500 for class I and many thousands for class II. This high degree of polymorphism constitutes a challenge for T cell epitope discovery, since each of these molecules potentially has a unique binding specificity, and hence a unique preference for which peptides to present to the immune system. Even though many of the alleles could be functionally very similar(i.e. hae binding pockets that are similar to other alleles) it is often very difficult a priori to identify such similarities since subtle differences in binding pocket amino acids can lead to dramatic changes in biding specificity. 

Many scientists tried to find out binding affinity between peptides and MHC molecule. However, most efforts in developing accurate prediction algorithms for MHC/peptide binding has focused on MHC class I. Here, large-scale eptiope discovery projects integrating high-throughput immunoassays with bioinformatics has achieved highly accurate prediction algorithms covering large proportions of the human MHC class I allelic polymorphism. The situation for MHC class II is quite different. Here, most prediction algorithms have been developed from small data sets covering a single or a few different MHC molecules. To our knowledge, only three such publicly available method exists: Propred, ARB, and NetMHCII. Propred is a publicly available version of the TEPITOPE method, which is an experimentally derived virtual matrix-based prediction method that covers 50 different HLA-DR alleles, and relies on the approximation that the peptide binding specificity can be determined solely from alignment of MHC pockets amino acids. NetMHCII and ARB are weight matrix data-driven methods deriven from quantitiative peptide/MHC binding data and covers 14 HLA-DR alleles. Most other HLA class II prediction methods have been trained and evalauated on very limited data sets covering only a single or a few different HLA class II alleles. 

We have previously shown that a minimum number of 100-200 peptides with characterized binding affinity is needed to derive an accurate description of the binding motif for MHC class II allelles. [[1]](https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-8-238) Characterizing the binding preference of each MHC molecule would therefore be an immense and very costly undertaking. In a recent paper, we have demonstrated that is a possible to derive accurate predictions for any HLA class I A and B loci protein of known sequence, by interpolating information from neighboring HLA class I molecules which have been experimentally addressed. It would therefore seem natural to attempt as similar approach to derive a pan-specific HLA class II prediction algorithm. For two major reasons, however, the situation for HLA class II is very different from HLA class I. Firstly, quantitative binding data is only available for a few HLA class II prediction algorithm. Secondly, the HLA class II binding groove is open at both ends allowing binding of peptides extended betond the nonamer-binding core. A prerequisitite for deriving a pan-specific binding prediction algorithm is therefore a precise alignment of the peptide-binding core to the HLA binding cleft. This alignment is essential since the algorithm underlying the pan-specific binding predictions relies on the ability to capture general features of the relationship between peptides and HLA sequences and interact these in terms of a binding affinity. We have recently published a method for prediction of peptide-MHC class II binding that covers the 14 HLA-DR alleles which are populated with large amounts for quantitative peptide data in the IEDB database. This method provides a predicted binding affinity value for each peptide, together with an identification of the peptide-binding core.

## Materials and Methods

### Data

Quantitative HLA-DR restricted peptide-binding data was obtained from the IEDB database and from an in-house collection of unpublished data. For external evaluation of the pan-specific method, we included a set of HLA-DR class II ligands from the SYFPEITHI database. Only ligands not included in the quantitatitve HLA-DR restricted peptide binding data set were used. The SYFPEITHI data set consists of 584 MHC ligands restricted to 28 HLA-DR alleles.

### Method

![fig1](https://jasonkim8652.github.io/assets/images/NetMHC2pan1png.png)

The peptide nonamer core and peptide-flanking residues (PFR) were identified for each of the peptides in the IEDB dataset using the SMM-align method. The SMM-align method identifies of the maximal scoring nonamoer peptide core for each peptide sequence. This approach will thus leave out information on the suboptimizal nonamer sequences that are predicted not to bind or to bind with a weaker affinity. To include information on the suboptimal nonamer sequences that are predicted not to bind or to bind with a weaker affinity. To include information on the binding affinity for these suboptimal nonamer peptides, we assign a normalized binding score, $ S_{norm} $, to suboptimal nonamer peptides given as the ratio of the SMM-align score for the peptide to the SMM_align score of the optimal peptide multiplied with the log-transformed experimental IC50 binding value of the peptide. That is $ S_{norm} = (S/S_M)M $, where S is the SMM-align score for the suboptimal peptide, $ S_M $is the SMM_align score of the optimal peptide, and M is the bindign value log-transformed as 1-log(aff), where aff is the experimental IC50 binding value of the full-length peptide. In case the SMM-align method assigns the maximal scoring nonamer peptide a log-transform binding value of 0, the log-transformed experimental IC50 binding value is assigned randomly to one of the suboptimal peptides and all other nonamer peptides are givena a binding value of 0. In doing this expansion using sub-optimal nonamer peptides, the size of the IEDB dataset was enlarged from 14,607 to more than 100,000 data points. This more than 5 fold increase of the data gave consistent improvements to the accuracy of the prediction method in all benchmark calculations. For each peptide core, the PFRs were identified as the amino acids flanking the peptide core up to maximum of three at either end.

### HLA Pseudo-Sequence

The contact residues are defined as being within 4.0$ \AA $ of the peptide in any of a representative set of HLA class II structures. Only residues polymorphic in any known HLA-DR, DQ and DP protein sequence were included giving rise to a pseudo-sequence consisting of 21 amino acid residues.

### Neural Network training

The input sequences were presented to the neural network in three ditinct manners: (a) conventional sparse encoding(i.e., encoded by 19 zeros and a one), (b) Blosum encoding, where each amino acid was encoded by the BLOSUM50 matrix score vector, and (c) a mixture of the two, where the peptide was sparse encoded and the HLA pseudo seqeuce was Blosum encoded. PFRs were calculated as the average BLOSUM62 score over a maximum length of three amino acids. The PFR length was encoded as $L_{PFR}/3$, $1-L_{PFR}/3$, where $L_{PFR}$ is the length of the PFR(between 0 and 3), and the peptide length was encode as $ L_{PEP}$, $1- L_{PEP}$, where $ L_{PEP} = 1/(1+exp((L-15)/2)) $ and L is the peptide length.  For each data point, the input to the neural network thus consists of the peptide sequence, the PFRs, the HLA pseudo sequence, the peptide length, and the length of the C and N terminal PFR's resulting in a total of 646 input values. 

For each HLA-DR molecule, a neural network ensemble was trained using all available data, excluding all data specific for the HLA-DR allele in question. Network architectures with hidden neurons of 22, 44,56, and 66 were used. The network training was performed in a fivefold corss-validated manner using the three encoding schemes described above resulting in an ensemble of 60 neural networks (3 encoding schemes, 4 architrctures, and 5 folds). The predictited affinity for a peptide was then determined as prediction value for the maximal scoring nonamer peptide core (including PFRs), where each nonamer peptide core is cored as the average of the 60 predictions in the neural network ensemble. 

## Results

### Leave-one-out validation

![fig2](https://jasonkim8652.github.io/assets/images/NetMHC2pan2.png)

The predictive performance of the pan-specific method relies on the ability to interpolate information from "neighboring" alleles in HLA specificity space and interpret this information in terms of binding affinities. It is thus expected that the pan-specific method should perfom best in cases where closely related HLA molecules are included in the training of the method. 

### Identifying Endogeneously Presented Peptides

The NetMHCIIpan method was further validated using a large set of data from the SYFPEITHI database, which were not included in the training data of the NetMHCIIpan method. This set consists of 584 HLA ligands restricted to 28 different HLA-DR alleles. For every peptides, the source protein was found in the SwissProt database. If more than one source protein was possible, the longest protein was chose. The source protein was split into overlapping peptide sequences of the length of the HLA ligand. All peptides except the annotated HLA ligand were taken as negative peptides. 

![fig3](https://jasonkim8652.github.io/assets/images/NetMHC2pan3.png)

The netMHCIIpan and TEPITOPE methods have similar predictive performance on the subset of 17 alleles covered by both methods. The TEPITOPE method has the highest performacne for 10 alleles and the NetMHCIIpan the highest performance for 7 alleles. For the 11 alleles not covered by the TEPITOPE method, NetMHCIIpan achieves the highest performance for 9 alleles, and the TEPTIOPE method the highest performance for 2 alleles. 

### Discussion 

In the present work, we develop a HLA-DR pan-specific method, NetMHCIIpan, capable of providing quantitative predictions of peptide binding to all HLA-DR molecules with known protein sequence. 

## Reference

1. Nielsen, Morten, Claus Lundegaard, and Ole Lund. "Prediction of MHC class II binding affinity using SMM-align, a novel stabilization matrix alignment method." BMC bioinformatics 8.1 (2007): 1-12.