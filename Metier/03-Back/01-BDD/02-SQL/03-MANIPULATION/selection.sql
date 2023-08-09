-- 1. Afficher pour chaque fournisseur le nombre de produit proposé ainsi que le prix minimum et maximum

SELECT sup_name, COUNT(pro_id), MIN(pro_price), MAX(pro_price)
FROM suppliers
JOIN products
ON sup_id = pro_sup_id
GROUP BY sup_name;


-- 2. Afficher les clients français


SELECT *
FROM customers
WHERE cus_countries_id IN (
    SELECT cou_id
	FROM countries
	WHERE cou_name = "France"
);

-- 3. Afficher les clients n'ayant jamais passer de commande

SELECT *
FROM customers
LEFT JOIN orders
ON ord_cus_id = cus_id
WHERE ord_cus_id IS NULL;


SELECT tableTemp.sup_name
FROM (
    SELECT sup_name, COUNT(pro_id), MIN(pro_price), MAX(pro_price)
    FROM suppliers
    JOIN products
    ON sup_id = pro_sup_id
    GROUP BY sup_name
) as tableTemp;