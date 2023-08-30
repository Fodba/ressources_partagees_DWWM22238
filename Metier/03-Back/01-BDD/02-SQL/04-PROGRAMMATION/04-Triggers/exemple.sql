DELIMITER |
    CREATE PROCEDURE MiseAjourStock(
        IN p_produit_id INT,
        IN p_quantite INT
    )
	BEGIN
        UPDATE products
        SET pro_stock = pro_stock - p_quantite
        WHERE pro_id = p_produit_id;
	END |

DELIMITER ;

--------------------------------------------------

DELIMITER |
    CREATE TRIGGER GestionStockInsert
    AFTER INSERT
	ON orders_details
	FOR EACH ROW
	BEGIN
        UPDATE products
        SET pro_stock = pro_stock - NEW.ode_quantity
        WHERE pro_id = OLD.ode_pro_id;
	END |

DELIMITER ;

DELIMITER |
    CREATE TRIGGER GestionStockInsert
    AFTER INSERT
	ON orders_details
	FOR EACH ROW
	BEGIN
        CALL MiseAjourStock(NEW.ode_pro_id,NEW.ode_quantity);
	END |

DELIMITER ;

--------------------------------------------------

DELIMITER |
    CREATE TRIGGER GestionStockUpdate
    AFTER UPDATE
	ON orders_details
	FOR EACH ROW
	BEGIN
        UPDATE products
        SET pro_stock = pro_stock - NEW.ode_quantity
        WHERE pro_id = OLD.ode_pro_id;
	END |

DELIMITER ;

DELIMITER |
    CREATE TRIGGER GestionStockUpdate
    AFTER UPDATE
	ON orders_details
	FOR EACH ROW
	BEGIN
        CALL MiseAjourStock(OLD.ode_pro_id,NEW.ode_quantity);
	END |

DELIMITER ;