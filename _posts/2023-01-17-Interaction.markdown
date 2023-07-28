---
title:  "A Medicinal Chemist's Guide to Molecular Interactions(2010) : Part 1"
classes: wide
excerpt: "Paper review about Medicinal chemistry in molecular interaction"
date:   2023-01-17 17:31:24 +0900
categories: 
  - medchem
tags:
  - Medicinal chemistry
  - Molecular Interaction
mathjax: true
---

## Introduction

Structure-based drug design seeks to identify and optimize specific attractive interactions between ligands and their host molecules, typiclally proteins, given their 3D structures. This optimization process requires knowledge about interactions of attractive interactions that can be gleaned from crystal structure and associated affinity data. 

Here we compile and review the literature on molecular interactions as it pretrains to medicinal chemistry through a combination of **careful statistical analysis of the large body of publicly available X-ray structure data** (from CSD and PDB)and experimental and theoretical studies of specific model system. 

Throughout this article, we wish to raise the readers' awareness that formulating rules for molecular interactions is only possible within certain boundaries. The combination of 3D structure analysis with binding free energies does not yield a complete understanding of the energetic contributions of individual interactions. While it would be desirable to associate observed interactions with energy terms, we have to accept that molecular interactions behave in a highly nonadditive fashion. The same interaction may be worth different amounts of free energy in different contexts, and it is very hard to find an objective frame of reference for an interaction, since any change of a molecular structure will have multiple effects. 

In reality, the multiplicity of interactions present in a single protein-ligand complex is a compromise of attractive and repulsive interactions that is almost impossible to deconvolute. By focusing on observed interactions, one neglects a large part of the thermodynamic cycle represented by a binding free energy: solvation processes, long-range interactions, conformational changes. Also, crystal structure coordinates give  misleadingly static views of interactions. In reality a macro-  molecular complex is not characterized by a single structure  but by an ensemble of structures. Changes in the degrees of  freedom of both partners during the binding event have a large  impact on binding free energy.

## General Design Aspects

### Entropic and Enthalpic Components of Binding

Like any other spontaneuos process, a noncovalent binding event takes place only when it is associated with a negative binding free energy. Where crystal structure information exists as well, it is tempting to speculate about the link between thermodynamics and geometery of protein-ligand complexes. A rough correlation between the burial of apolar surface area and free energy could be derived, but beyond that, practically useful relationships between the burial of apolar surface area and free energy relationships between structure and the componenets of free energy have remained elusive. This is not surprising, as both entropy and enthalpy terms obtained from calrimetric experiments contain solute and solvent contributions and thus cannot be interpreted on the basis of structural data alone. 

Furthermore, from an experimental point of view, such studies are very demanding: Error margins are significantly larger than the fitting errors usually reported and depend on subtle details of exeprtimental setup. Entropy and enthalpy values are sensitive to conditions such as salt concentrations and choice of buffer. 

Freire suggested that best-in-class drugs bind to their targets in an enthalpy-driven fashion.[[1]](https://link.springer.com/chapter/10.1007/0-387-24532-4_13) His group established a comprehensive ITC data set on HIV pretease inhibitors, concluding that second- and thrid-generation inhibitors, concluding that second- and third-generation inhibitors bind through a strong enthalpy component. One may argue that this could be caused by a higher number of specific backbone interactions, partially replacing the larger lipophilic surface area of the first generation inhibitors, and that the larger reliance on backbone interactions, partially replacing the larger lipophilic surface area of the first generation inhibitors, and that the larger reliance on backbone interactions could be the cause for the broader coverage of HIV protease mutants. Still, even in this data set small structural changes cause large difference in relative $$\Delta H$$ and $$T \Delta S$$ contributions that are hard to explain structurally. Amprenavir and darunavir differ only in one cyclic either moiety, but there is a drastic difference of about 10 Kcal/mol in binding enthalpy between these two ligands. 

Since entropic and enthalpic components of binding are highly dependent on many system-specific properties, the practitioner has to conclude that optimizing for free energy is still the only viable approach to structure-based design. Perhaps the greatest advantage in the attempt to interpret components of $$\Delta G$$ is that it forces us to think about two fundamental topics in unprecedented detail: viewing protein-ligand complexes as flexible entities rather than fixed structures and the role of desolvation effects. These two topics will be dicussed next. 

### Flexibility and Cooperativity

A discussion of the thermodynamics of ligand binding is not complete without metioning the phenomenon of entropy-enthalpy compensation. There is ample evidence of meaningless and spurious correlations between $$\Delta H$$ and $$T \Delta S$$ , often due to far larger variations(sometimes through larger experimental errors) in $$\Delta H$$ than in $$\Delta G$$. Also, compensation is no thermodynamic requirement: If changes in $$\Delta H $$ were always compensated by opposing changes in $$ T \Delta S $$, optimization of binding affinities would hardly be possible. 

Nevertheless, there seems to be a mechanism behind the compensation frequently observed in host-guest chemistry and in protein-ligand interactions. In short, the tighter and more directed an interaction, the lese entropically favorable it is. **Bonding opposes motion, and motion opposes bonding.** However, the detailed nature of these compensatory mechanisms is highly system-dependent and the mechanisms do not obey a single functional form. As a consequence, noncovalent interactions can be positively cooperative; that is, the binding energy associated with there acting together is greater than the sum of the individual binding free energies. Detailed studies by Williams on glycopeptide antibotics indicate that cooperativity may be caused by structural tightening upon introduction of additional interactions; interaction distances become shorter and enthalpically more favorable. Evidence for such effects also exists in protein-protein and protein-ligand complexes.

Hunter has proposed an alternative model of cooperativity. [[2]](https://www.sciencedirect.com/science/article/pii/S1074552103002394) Flexible molecules may exist in a series of partially bound states, where not all interactions are made at the same time. Upon introduction of further interactions, the balance shifts toward more frequent formation of the interactions and less mobility. There is experimental evidence for both the structural tightening model and the model of paritally bound states in different systems. Since proteins bind ligands in many geometric arrangements ranging from loosely surface-bound to deeply buried, it is likely that both are valid in different contexts. Ligands with increasingly longer linear and lipophilic side chains have been oberved to bind with increasingly favorable entropies and increasingly unfavorable enthalpies against trypsin and carbonic anhydrase. Longer side chains retain more residual mobility and form less tight (or less frequent) interactions with the protein surface, trading enthalpy for entropy. 

What can we learn from this study? First, small changes in $$ \Delta G $$ often mask large and mutually compensating changes in $$ \Delta H $$ and $$ T \Delta S$$. Focusing on $$\Delta G$$ in designing new molecules is certainly still the safest bet. Second, in medicinal chemistry we often rely on cooperative effects without even noticing, and yet in our minds we attempt to decompose binding free energies into additive elements. There is nothing wrong with this empirical approach as long as we keep in mind that it is primarily useful to teach us about the limits of additivity. The knowledge that specific interactions, in particular strongly directed ones like hydrogen bonds, rididify a protein-ligand complex may help us to exploit cooperativity in a more rational fashion. The Klebe data should also make us think about the degree of mobility required in interactions with different parts of the protein. Flexible domains may require more flexible ligand moiteties than highly ordered ones. The thermodynamic signature of a "good" ligand in not necessarily dominated by an enthalpic term. Our traditional focus on visible interactions and on the induced fit model has led to an overly enthalpic view of the world that neglects flexibility and cooperativity. It also neglects local solvation phenomena, whose details strongly affect the thermodynamic profile of a molecular recognition event. We should learn to incorporate these into our thinking, at least in a qualitative fashion. 

### Desolvation and the Hydrophobic Effect

The classic concept of the hydrophobic efffect is as follows: A hydrophobic solute disrupts the structure of bulk water and decreases entropy because of stronger bonding and ordering of water molecules around the solute. Such disruptions can be minimized if nonpolar solute molecules aggregate. Water then forms one larger "cage" structure around the combined solutes, whose surface area will be smaller than the combined surfaces areas of isolated solutes. This maximizes the amount of free water and thus the entropy. 

If the mechanism were the sole driving force for a protein-ligand interaction, all binding events involving hydrophobic partners would be entropy-driven. But spectroscopic evidence indicates that hydrogen bonds at hydrophobic surfaces are weaker and water molecules more flexible than originally assumed. In addition, already simple water models show that size and surface curvature of solutes have a dramatic impact on their solvation thermodynamics. Complexation thermodynamics driven by enthalpic forces have been regularly observed in host-guest chemistry and have been dubbed the "nonclassical hydrophobic effect". Homans has carefully studied the ligand-binding thermodynamics of the mouse major urinary protein(MUP). THe key to the extermely favorable enthalpy of binding of ligands to MUP seems to be the subomptimal hydration of the binding pocket in the unbound state. The key to the extremely favorable enthalpy of binding of ligands to MUP seems to be the suboptimal hydration of the binding pocket in the unbound state. The negative change in heat capacity upon binding, a hallmark of the hydrophobic effect, is also observed with MUP ligands. It is largely determined by ligand desolvation, with minor contribution form desolvation of the protein. It is quite likely that the synthetic hosts displaying an enthalpy-driven complexation behavior are also incompletely hydrated in the unbound state becuase they typically feature narrow lipophilic clefts not unlike that of MUP. Desolvation costs are also the likely cause why some ligands that seem to fit into a binding site cannot experimentally be confirmed to be inhibitors. 

From these studies it becomes clear that carefully probing the hydration state of a protein binding pocket in the unbound state should be a standard element of structure-based design, as it will likely point out regions where most binding energy can be gained. Failure to match key hydrophobic areas with appropriate ligand moieties can have a severe impact on binding affinity. 

![fig1](https://jasonkim8652.github.io/assets/images/Interactions_1.PNG)

Above figure shows that an optimized factor Xa inhibitor is rendered virtually inactive when the key interacting group in the S4 pocket is replaced by hydrogen. Not only does the isopropyl group optimally interact with the S4 pocket but its removal leads to a very unfavorably solvated state of the pocket that is likely the main reason for the dramatic loss of affinity. 

### Structural Water

### Repulsive Interactions

## References

1. Freire, Ernesto. "A thermodynamic guide to affinity optimization of drug candidates." *Proteomics and protein-protein interactions: Biology, chemistry, bioinformatics, and drug design*. Boston, MA: Springer US, 2005. 291-307.
2. Hunter, Christopher A., and Salvador Tomas. "Cooperativity, partially bound states, and enthalpy-entropy compensation." Chemistry & biology 10.11 (2003): 1023-1032.

