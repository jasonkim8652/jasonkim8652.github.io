---
title:  "NNAlign_MA; MHC Peptidome Deconvolution for Accurate MHC Binding Motif Chartacterization and Improved T-cell Epitope Predictions(2019)"
classes: wide
date:   2023-02-11 16:31:24 +0900
categories: 
  - immunogenecity
tags:
  - HLA-class2
---

## Introduction

Peptide-MHC binding affinity (BA) assays represented the first attempts to studying binding preferences of diffrent MHC molecules in vitro. However, BA characterization ignores many in vivo antigen processing and presentation features, such as protien internalization, protease digestion, peptide transport, peptide trimming, and the role of different chaperones involved in the folding of the pMCH complex. Further BA assays most often are conducted one peptide at a time, thus becoming costly, time-consuming, and low-throughput.

Recently, advances in liquid chromatography mass spectrometry(in short, LC-MS/MS) technologies have opened a new chapter in immunopeptidomics. Several thousands of MHC-associated eluted ligands(EL) can with this technique be sequenced in a single experiment and numerous assessments have proven MS EL data to be a rich source of information for both rational identification of T-cell eptiopes and learning the rules of MHC antigen presentation. 

Except genetically engineered celss, all nucleated cells express multiple MHC-I alleles and all antigen presenting cells additionally express multiple MHC-II alleles on their surface. The antibodies used to purify peptide-MHC complexes in MS EL experiments are mostly pan- or locus-specific, and the data generated in an MS experiment are thus inherently poly-specific -i.e. they contain ligands matching multiple binding motifs. For instance, in the context of the human immune system, each cell can express up to six different MHC class I molecules, and the immunopeptidome obtained using MS techniques will thus be a mixture of all ligands presented by these MHCs. The poly-specific nature of MS EL libraries constitutes a challenge in terms of data analysis and interpretation, where, to learn specific MHC rules for antigen presentation, one must first associate each ligand to its presenting MHC molecules within the haplotype of the cell line.

Several approaches have been suggested to address this task, including experimental setups that employ cell lines expressing only one specific MHC molecule, and approaches inferring MHC associations using prior knowledge of MHC specificities or by means of unsupervised sequence clustering.

However, neither of these methods can fully deconvolute the complete number of MHC specificities present in each data set, especially for cell lines containing overlapping binding motifs and/or lowly expressed molecules. Moreover, for both methods the association of each of the clustered solutions to a specific HLA molecule must be guided by prior knowledge of the MHC binding motifs, for instance by recurring to MHC-peptide binding predictions.

The computational framework by Bassani-Sternberg et al. [[1]](https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1005725) employs MixMHCp to generate peptide clusters and binding motifs for a panel of poly-specificity MS data sets, and next links each cluster to an HLA molecule based on allele co-occurence and exclusion principles. Although this approach constitutes a substantial step forward for aiding the interpretaion of MS EL data, it has some substantial shortcomings. First and foremost, the success of the
method is tied to the ability of MixMHCp to identify all the binding motifs in a given MS data set, an ability that is challenged in particular for cell lines containing MHC alleles with similar binding motifs, and for molecules characterized by low expression levels. Secondly, successful HLA labeling of the obtained clusters is limited by allele co-occurrences and exclusions across multiple cell line data sets. Although one may argue that this shortcoming is destined to wane as more immunopeptidomics data sets are accumulated in public databases, there currently remain multiple cases when co-occurence and exclusion principles fail to completely deconvolute peptideom specifications.

This algorithm is an extension of the NNAlign neural network framework, and is capable of taking a mixed training set composed of single-allele data and Multi-allele data as input and deconvolute the individual MHC restrictions of all MA peptides while learning the binding specificities of all the MHCs present in the training set. NNAlign_MA performs these three tasks simultaneously, by iteratively updating the clustering, MHC annotation and peptide binding predictions in an integrated framework.

## Materials and Methods

### Peptide Data

Several types of MHC peptide data for human(HLA) and bovine (BoLA) class I, and HLA class II were gathered to trian the predictive models presented in this work. Peptide data was classified as single allele data (SA, where each peptide is associated to a single MHC restriction) and multi allele data(MA, where each peptide has multiple options for MHC restriction). MA data are generated from MS MHC ligand elution assays where most often a pan-specific antibody is applied for class I and either a pan-specific class II or a pan-DR specific andtibody is applied for class II in the immuno-precipitation step leading to data sets with poly-specificities mathcing the MHC molecules expressed in the cell line under study. SA data were obtained from binding affinity assays, or from mass spectrometry experiments performed using genetically engineered cell lines that artificially express one single allele. 

As for EL data, the Immune Epitope Database(IEDB) was queried to identify publications with a large number of allele annotated EL data, both SA and MA. Ligands were extracted from these publications, excluding any ligands with post translational modifications. Both BA and EL data was length filtered to include only peptides of length 13-21.

### NNAlign_MA Modeling and Training Hyperparameters

To be able to accurately handle and annotate MA data, NNAlign_MA imposes a burn-in period where the method is trained only on SA data. After the burn-in period, each data point in the MA data set is annotated by predicting binding to all possible MHC molecules defined in the MA data set and assigning the restriction from the highest prediction value. After this annotation step, teh SA and MA data are merged respecting the data partitioning to further train the algorithm.

### Prediction Score Rescaling

To level out differences in the prediction scores between MHC alleles imposed by the differences in number of positive training examples and distance to the training data included in the SA data set, a rescaling of the raw prediction values was implemented and applied in the MA data annotation. The rescaling was implemented as a z-score transformation of the raw prediction value. Here, the score distribution was estimated by predicting binding of 10,000 random natural 9mer peptides to MHC molecule in question. Next, the mean and standard deviation were estimated in question. Next, the mean and standard deviation were estimated from a positive normal distribution, iteratively excluding outliers. As the rescaling is imposed to level out score differences between MHC molecules characterized in the SA training binding data and molecules from the MA data distant to the training data, teh need for rescaling should be leveled out as the MA data are included in the training and the NNAlign_MA training progresses. To acheive this, we take a average of mean and deviation over all molecules in the MA data set. With this, one can modulate the rescaling of the data as a function of the iterations and the type of data being used for training(SA or MA). The shift value of the exponential present in w is a tunable parameter that defines this adjustment schedule. 

## References

1. Bassani-Sternberg, Michal, et al. "Deciphering HLA-I motifs across HLA peptidomes improves neo-antigen predictions and identifies allostery regulating HLA specificity." PLoS computational biology 13.8 (2017): e1005725.