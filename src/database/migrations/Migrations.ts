import { BaseDatabase } from "../BaseDatabase"
import { ProductDatabase } from "../ProductDatabase"

class Migrations extends BaseDatabase {
    execute = async () => {
        try {
            console.log("Creating tables...")
            await this.createTables()
            console.log("Tables created successfully.")

            console.log("Migrations completed.")
        } catch (error) {
            console.log("FAILED! Error in migrations...")
            if (error instanceof Error) {
                console.log(error.message)
            }
        } finally {
            console.log("Ending connection...")
            BaseDatabase.connection.destroy()
            console.log("Connection closed graciously.")
        }
    }

    createTables = async () => {
        await BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS ${ProductDatabase.TABLE_PRODUCTS_TAGS};
        DROP TABLE IF EXISTS ${ProductDatabase.TABLE_TAGS};
        DROP TABLE IF EXISTS ${ProductDatabase.TABLE_PRODUCTS};

        CREATE TABLE IF NOT EXISTS ${ProductDatabase.TABLE_PRODUCTS} (
            id INT PRIMARY KEY,
            name VARCHAR(255)
        );
        
        CREATE TABLE IF NOT EXISTS ${ProductDatabase.TABLE_TAGS} (
            tag_name VARCHAR (255) PRIMARY KEY
        );
        
        CREATE TABLE IF NOT EXISTS ${ProductDatabase.TABLE_PRODUCTS_TAGS} (
            product_id INT,
            product_tag VARCHAR (255),
            FOREIGN KEY (product_id) REFERENCES Amaro_Products (id),
            FOREIGN KEY (product_tag) REFERENCES Amaro_Tags (tag_name)
        );
        `)
    }
}

const migrations = new Migrations()
migrations.execute()