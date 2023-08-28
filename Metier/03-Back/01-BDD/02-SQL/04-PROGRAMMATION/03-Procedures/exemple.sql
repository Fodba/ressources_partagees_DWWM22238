DELIMITER |

CREATE PROCEDURE CommandeDuJour()
BEGIN
	SELECT *
    FROM orders
    JOIN orders_details
    ON ord_id = ode_ord_id
    WHERE DATE(ord_order_date) = DATE(NOW());
END |

DELIMITER ;

-- Créer la procédure qui affiche toutes les commandes du jour
DELIMITER |

CREATE PROCEDURE commandeDuJour()
BEGIN 
	-- Code de la procédure.
    SELECT *
    FROM orders
    JOIN orders_details
    ON ord_id = ode_ord_id
    JOIN products
    ON pro_id = ode_pro_id
    WHERE DATE(ord_order_date) = CURDATE();

END |

DELIMITER ;
---------------------------------------------------------

DELIMITER |

CREATE PROCEDURE CommandesClient(
    IN p_cliNom VARCHAR(50),
    IN p_cliPrenom VARCHAR(50)
)
BEGIN

SELECT *
FROM orders
JOIN customers
ON cus_id = ord_cus_id
JOIN orders_details
ON ord_id = ode_ord_id
WHERE cus_lastname = p_cliNom and cus_firstname = p_cliPrenom;

END |

DELIMITER ;


-- Créer la procédure qui affiche toutes les commandes d'un client
DELIMITER |
CREATE PROCEDURE CommandesClient(
    IN p_lastname VARCHAR(50),
    IN p_firstname VARCHAR(50)
)
BEGIN

	SELECT *
	FROM orders
	JOIN customers
    ON cus_id = ord_cus_id
    WHERE cus_lastname = p_lastname AND cus_firstname = p_firstname;

END |
DELIMITER ;
-------------------------------------------------------

DELIMITER |

CREATE PROCEDURE FicheSalarie(IN p_lastname VARCHAR(50),IN p_firstname VARCHAR(50))
BEGIN

SELECT CONCAT(emp_lastname," ",emp_firstname) as "employé(e)", emp_gender as "genre",
	pos_libelle as "poste", emp_city as "ville", emp_mail as "email", emp_phone as "téléphone", emp_salary as "salaire"
FROM employees
JOIN posts
ON pos_id = emp_pos_id
WHERE emp_lastname LIKE p_lastname and emp_firstname LIKE p_firstname;

END |

DELIMITER ;

-------------------------------------------------------

-- Calcule le CA par pays pour l'année en cours (avec paramètre entrant et sortants)

DELIMITER |

CREATE PROCEDURE EncoursCA(
    IN p_pays VARCHAR(50),
    OUT p_CA DOUBLE(6,2)
)
BEGIN

		SELECT SUM(ode_unit_price*ode_quantity * ode_discount) AS CA INTO p_CA
        FROM orders
        JOIN orders_details
        ON ord_id = ode_ord_id
        JOIN customers
        ON ord_cus_id = cus_id
        JOIN countries
        ON cus_countries_id = cou_id
        WHERE cou_name = p_pays
        AND YEAR(ord_order_date) = YEAR(NOW())
END |
DELIMITER ;