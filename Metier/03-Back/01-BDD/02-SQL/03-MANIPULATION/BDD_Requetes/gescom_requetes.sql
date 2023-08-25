-- 1. Afficher dans l'ordre alphabétique et sur une seule colonne les noms et prénoms des employés qui ont des enfants, présenter d'abord ceux qui en ont le plus.
SELECT CONCAT(emp_lastname," ",emp_firstname) as "employé(e)s"
FROM employees
WHERE emp_children > 0
ORDER BY emp_firstname, emp_children DESC;

-- 2. Y-a-t-il des clients étrangers ? Afficher leur nom, prénom et pays de résidence.

SELECT cus_lastname, cus_firstname, cou_name
from customers
JOIN countries
ON cou_id = cus_countries_id;

-- 3. Afficher les villes de résidence des clients.

SELECT cus_lastname, cus_firstname, cus_city
from customers;

-- 4. Afficher les clients dont les fiches ont été modifiées.

SELECT cus_lastname, cus_firstname, cus_update_date
FROM customers
WHERE cus_update_date IS NOT null;

-- 5. La commerciale Coco Merce veut consulter la fiche d'un client, mais la seule chose dont elle se souvienne est qu'il habite une ville genre 'divos'. Pouvez-vous l'aider ?

SELECT cus_lastname, cus_firstname, cus_city
FROM customers
WHERE cus_city LIKE "%divos%";

-- 6. Quel est le produit vendu le moins cher ?

-- v1
SELECT pro_ref, pro_name, pro_price, ode_unit_price, ode_discount
FROM products
JOIN orders_details
ON ode_pro_id = pro_id
ORDER BY ode_unit_price;

-- v2
SELECT pro_ref, pro_name, pro_price, ode_unit_price, ode_discount
FROM products
JOIN orders_details
ON ode_pro_id = pro_id
GROUP BY pro_name
ORDER BY ode_unit_price;

-- 7. Afficher les produits commandés par Madame Pikatchien

SELECT cus_lastname, cus_firstname, ord_order_date, pro_name, ode_unit_price, ode_discount
FROM products
JOIN orders_details
ON pro_id = ode_pro_id
JOIN orders
ON ord_id = ode_ord_id
JOIN customers
ON cus_id = ord_cus_id
WHERE cus_lastname = "Pikatchien";

-- 8. Lister les produits qui n'ont jamais été vendus.

SELECT *
FROM products
WHERE pro_id NOT IN 
(SELECT pro_id
FROM products
JOIN orders_details
ON pro_id = ode_pro_id)

-- 9. Afficher l'organigramme hiérarchique de l'entreprise.

-- v1
SELECT CONCAT(emp.emp_firstname," ",emp.emp_lastname) as "employé",CONCAT(chef.emp_firstname," ",chef.emp_lastname) as "chef"
FROM employees as emp
JOIN employees as chef
ON chef.emp_id = emp.emp_superior_id;

-- v2
SELECT CONCAT(emp.emp_firstname," ",emp.emp_lastname) as "employé",CONCAT(chef.emp_firstname," ",chef.emp_lastname) as "chef"
FROM employees as emp
JOIN employees as chef
ON chef.emp_id = emp.emp_superior_id
ORDER BY chef.emp_pos_id, chef.emp_id;

-- 10. Afficher le catalogue des produits par catégorie. Le nom des produits et de la catégories doivent être affichés.

SELECT pro_name, cat_name
FROM products
JOIN categories
ON cat_id = pro_cat_id
ORDER BY cat_id;

-- 11. Quel produit a reçu la remise la plus élevée ?

SELECT table2.pro_id as id, table2.pro_name as produit, MAX(table2.ode_discount) as remise
FROM (SELECT ode_discount, pro_id, pro_name
FROM products
join orders_details
on pro_id = ode_pro_id) as table2;

-- 12. Lister les commandes dont le total est inférieur à 100 €.

SELECT *
from (
   SELECT ord_id, sum(ode_unit_price) AS total
   FROM orders
   JOIN orders_details
   ON ord_id = ode_ord_id
   GROUP BY ord_id
) as result
WHERE result.total < 100;


-- 13. Combien y-a-t-il de clients canadiens ? Afficher les résultats dans une colonne intitulée 'Nb clients Canada'. 

SELECT COUNT(cus_id) as "Nb clients Canada"
FROM customers
JOIN countries
ON cus_countries_id = cou_id
WHERE cou_name = "Canada";

SELECT COUNT(cus_id) as "Nb clients Canada"
FROM customers
WHERE cus_countries_id in(
    SELECT cou_id
    from countries
    WHERE cou_name = "Canada"
);

-- 14. Quel produit marche le mieux ?

SELECT pro_name, ode_pro_id, count(ode_pro_id) as "nombre de commandes"
FROM orders_details 
JOIN products 
ON ode_pro_id = pro_id
GROUP BY ode_pro_id
ORDER BY count(ode_pro_id) DESC, ode_pro_id ASC;
-- LIMIT 1;

-- 15. Quelle est la plus grande quantité commandée pour un seul produit et quel est ce produit ? 

SELECT pro_name, pro_ref, ode_quantity as "quantité commandée"
FROM products
JOIN orders_details
ON pro_id = ode_pro_id
ORDER BY ode_quantity DESC
LIMIT 1;  

-- 16. Afficher le détail des commandes de 2020.

SELECT *
FROM orders
JOIN orders_details
ON ord_id = ode_ord_id
WHERE ord_order_date LIKE "2020%";

SELECT *
FROM orders
JOIN orders_details
ON ord_id = ode_ord_id
WHERE YEAR(ord_order_date) = 2020;

-- 17. Afficher les coordonnées des fournisseurs pour lesquels des commandes ont été passées.

SELECT sup_name, sup_city, sup_address, sup_zipcode, sup_contact, sup_phone, sup_mail
FROM suppliers
JOIN products
ON sup_id = pro_sup_id
JOIN orders_details
ON pro_id = ode_pro_id
GROUP BY sup_id;

-- 18. Quel est le chiffre d'affaires de 2020 ?

SELECT sum((ode_unit_price * ode_quantity) - ode_discount) as "chiffre d'affaire 2020"
FROM orders
JOIN orders_details
ON ord_id = ode_ord_id
WHERE YEAR(ord_order_date) = 2020;

-- 19. Quel est le panier moyen ?

SELECT ROUND(AVG((ode_unit_price * ode_quantity) - ode_discount),2) as "panier moyen"
FROM orders_details;

-- 20. Où le chiffre d'affaires à l'export est-il le plus élevé ?  

SELECT cou_name, SUM((ode_unit_price * ode_quantity) - ode_discount) as CA
FROM orders_details
JOIN orders
ON ode_ord_id = ord_id
JOIN customers
on ord_cus_id = cus_id
JOIN countries
ON cus_countries_id = cou_id
WHERE cou_name != "France"
GROUP BY cou_name
ORDER BY CA desc;

-- 21. Lister le total de chaque commande par total décroissant (Afficher numéro de commande, date, total et nom du client).

SELECT *, ord_id, ord_order_date, SUM((ode_unit_price * ode_quantity) - ode_discount), cus_lastname
FROM customers
JOIN orders
ON cus_id = ord_cus_id
JOIN orders_details
ON ord_id = ode_ord_id
GROUP BY ord_id
ORDER BY cus_lastname;

-- 22. La version 2020 du produit _barb004_ s'appelle désormais _Camper_ et, bonne nouvelle, son prix subit une baisse  de 10%.
UPDATE products
SET pro_ref = "Camper", pro_price = pro_price - (pro_price * 10)/100
WHERE pro_ref = "barb004";

-- 23. L'inflation en France en 2019 a été de 1,1%, appliquer cette augmentation à la gamme de parasols.
UPDATE products p
JOIN categories c on p.pro_cat_id = c.cat_id
SET p.pro_price = p.pro_price * 1.1
WHERE cat_name = "parasols";


UPDATE products
SET pro_price = pro_price * 1.011
WHERE pro_cat_id = (
   SELECT cat_id
   FROM categories
   WHERE cat_name = "Parasols";
) 

UPDATE products
SET pro_price = pro_price * 1.011
WHERE pro_cat_id IN (
   SELECT cat_id
   FROM categories
   WHERE cat_name = "Parasols";
) 

-- 24. Supprimer les produits non vendus de la catégorie "Tondeuses électriques" (ces produits sont : 36, 37 et 41 de la catégorie 9). 
DELETE products
FROM products
JOIN categories
ON products.pro_cat_id = categories.cat_id
WHERE categories.cat_name = 'Tondeuse électriques'
AND products.pro_id NOT IN (
   SELECT ode_pro_id
   FROM orders_details
);
