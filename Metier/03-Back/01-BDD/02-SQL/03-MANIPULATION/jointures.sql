-- 1. Afficher tous les clients français. (Customers,Countries)

SELECT *
FROM Customers
JOIN countries
ON cus_countries_id = cou_id
WHERE cus_countries_id = 'FR';

-- 2. Afficher tous les employés du département 'Distribution' (employees, departments)
SELECT emp_firstname AS "nom de l'employée", dep_name AS "nom du département"

FROM employees

JOIN departments ON employees.emp_dep_id = departments.dep_id

WHERE departments.dep_name = "Distribution";

-- 3. Afficher tous les produits de la gamme 'Parasols' (products categories)
SELECT pro_name, cat_name
FROM products as p
JOIN categories as c
ON c.cat_id = p.pro_cat_id
WHERE c.cat_name = "Parasols";

-- 4. Afficher toutes les commandes des clients canadiens. (customers orders countries)

SELECT *
FROM orders
JOIN customers
ON orders.ord_cus_id = customers.cus_id
JOIN countries
ON customers.cus_countries_id = countries.cou_id
WHERE countries.cou_name = "Canada";


-- 5. Afficher les catégorie et leur catégorie parente.