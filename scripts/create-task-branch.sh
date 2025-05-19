#!/bin/bash
# Script pour créer une branche Git à partir d'une tâche dans todo.md

# Vérifier si un argument a été fourni
if [ $# -eq 0 ]; then
    echo "Usage: $0 <nom-de-la-tâche>"
    echo "Tâches disponibles:"
    grep -o '- \[ \] \([a-zA-Z0-9-]\+\):' /Users/davidlagace/Documents/Dev/bobarr/todo.md | sed 's/- \[ \] \(.*\):/\1/'
    exit 1
fi

TASK_NAME=$1

# Vérifier si la tâche existe dans todo.md
if ! grep -q "- \[ \] $TASK_NAME:" /Users/davidlagace/Documents/Dev/bobarr/todo.md; then
    echo "Erreur: La tâche '$TASK_NAME' n'existe pas dans todo.md"
    echo "Tâches disponibles:"
    grep -o '- \[ \] \([a-zA-Z0-9-]\+\):' /Users/davidlagace/Documents/Dev/bobarr/todo.md | sed 's/- \[ \] \(.*\):/\1/'
    exit 1
fi

# Créer la branche
git checkout -b $TASK_NAME

# Mettre à jour le statut de la tâche dans todo.md (marquer comme en cours)
sed -i '' "s/- \[ \] $TASK_NAME:/- [x] $TASK_NAME (en cours):/" /Users/davidlagace/Documents/Dev/bobarr/todo.md

# Ajouter une entrée dans change.md
DATE=$(date +%Y-%m-%d)
echo -e "\n## [$DATE] - [$TASK_NAME]\n\n### Changements\n- \n\n### Fichiers modifiés\n- \n\n### Tests effectués\n- \n\n### Notes\n" >> /Users/davidlagace/Documents/Dev/bobarr/change.md

echo "Branche '$TASK_NAME' créée avec succès!"
echo "Une entrée a été ajoutée dans change.md. N'oubliez pas de la compléter avec vos modifications."
echo "Utilisez le template de commit pour vos commits:"
echo "git config --local commit.template .github/COMMIT_TEMPLATE.md"
