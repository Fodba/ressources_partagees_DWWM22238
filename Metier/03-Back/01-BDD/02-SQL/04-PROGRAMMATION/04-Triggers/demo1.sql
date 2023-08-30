SELECT * FROM produit;
SELECT * FROM client;
SELECT * FROM commande;
SELECT * FROM lignedecommande;

-- Soluce 1
INSERT INTO commande (id, id_client, date_commande, remise) VALUES (25, 2, '2018-09-01', 0);

INSERT INTO lignedecommande (id_commande, id_produit, prix, quantite) VALUES (25, 1, 12, 40);
INSERT INTO lignedecommande (id_commande, id_produit, prix, quantite) VALUES (25, 2, 1, 2);
INSERT INTO lignedecommande (id_commande, id_produit, prix, quantite) VALUES (25, 4, 7, 5);
INSERT INTO lignedecommande (id_commande, id_produit, prix, quantite) VALUES (25, 3, 8, 1);


-- Soluce 2
START TRANSACTION;

INSERT INTO commande (id_client, date_commande, remise) VALUES (2, '2018-09-01', 0);

SET @id_commande = (SELECT max(id) FROM commande);
SELECT @id_commande;

INSERT INTO lignedecommande (id_commande, id_produit, prix, quantite) VALUES (@id_commande, 1, 12, 40);
INSERT INTO lignedecommande (id_commande, id_produit, prix, quantite) VALUES (@id_commande, 2, 1, 2);
INSERT INTO lignedecommande (id_commande, id_produit, prix, quantite) VALUES (@id_commande, 4, 7, 5);
INSERT INTO lignedecommande (id_commande, id_produit, prix, quantite) VALUES (@id_commande, 3, 8, 1);

COMMIT;


