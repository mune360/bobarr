# Template de message de commit

## Format
```
[type]: [branche] - description courte

Description détaillée des changements

Tâche: #référence
Tests: Oui/Non
```

## Types
- feat: Nouvelle fonctionnalité
- fix: Correction de bug
- docs: Modification de la documentation
- style: Changements de formatage (espaces, indentation, etc.)
- refactor: Refactorisation du code
- perf: Amélioration des performances
- test: Ajout ou modification de tests
- chore: Tâches de maintenance

## Exemple
```
fix: fix-regex-special-chars - Correction du traitement des caractères spéciaux dans les expressions régulières

- Ajout d'échappement pour les caractères spéciaux comme les apostrophes et les crochets
- Mise à jour des tests pour couvrir les cas comme "X-Men '97"

Tâche: fix-regex-special-chars
Tests: Oui
```
