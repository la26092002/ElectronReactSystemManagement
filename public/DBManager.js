const Database = require("better-sqlite3");
const path = require("path");

const { app } = require("electron");
const dbPath = path.join(process.resourcesPath, "demo_tableeeee.db") // For packaged app
 

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

// produit(id,titre ,l’acheteur ,prixDachat ,prixVente ,description,date)
// lacheteur(id, nom)
const createPersonTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS buyer (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    id_buyer INTEGER,
    pricePurchace REAL NOT NULL,
    priceSale REAL ,
    description TEXT NOT NULL,
    date TEXT DEFAULT CURRENT_DATE,
    FOREIGN KEY (id_buyer) REFERENCES buyer(id)
);

CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number_phone TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
    `;
    db.exec(query);


     // Check if the user table is empty
     const rowCount = db.prepare("SELECT COUNT(*) AS count FROM user").get().count;

     if (rowCount === 0) {
         // Insert a single user if no rows exist
         db.prepare(`
         INSERT INTO user (number_phone, password)
         VALUES ('0797792672', '123456789');
         `).run();
     }
};

createPersonTable(); // Ensure the table is created when DBManager is loaded.

exports.db = db;
