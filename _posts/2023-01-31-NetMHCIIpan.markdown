---
title:  "Quantitative Predictions of Peptide Binding to Any HLA-DR molecule of known sequence: NetMHCIIPan(2008)"
classes: wide
date:   2023-01-31 16:31:24 +0900
categories: 
  - Immunogenecity
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



## Reference

1. Nielsen, Morten, Claus Lundegaard, and Ole Lund. "Prediction of MHC class II binding affinity using SMM-align, a novel stabilization matrix alignment method." BMC bioinformatics 8.1 (2007): 1-12.