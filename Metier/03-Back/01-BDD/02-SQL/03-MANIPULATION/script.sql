INSERT INTO gescom.categories(cat_parent_id,cat_label) VALUES (NULL,"jardin");
INSERT INTO gescom.categories(cat_label) VALUES ("été");


-- Affichage des catégories appartenant à la catégorie "été".
SELECT cat_id, cat_label, cat_parent_id
 FROM `categories`
WHERE cat_parent_id = 2;

-- Affichage des catégories qui n'ont pas de catégories parentes.
SELECT cat_id, cat_label, cat_parent_id
FROM `categories`
WHERE cat_parent_id IS NULL;

INSERT INTO categories(cat_label,cat_parent_id) VALUES ("exterieur",2);
INSERT INTO categories(cat_label,cat_parent_id) VALUES ("interieur",2);