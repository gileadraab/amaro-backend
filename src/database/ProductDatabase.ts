import { IGetProductDBDTO, IGetProductRawDBDTO, IProductDB, IProductTagDB, ITagDB, Product } from "../models/Products"
import { BaseDatabase } from "./BaseDatabase"

export class ProductDatabase extends BaseDatabase {
    public static TABLE_PRODUCTS = "Amaro_Products"
    public static TABLE_TAGS = "Amaro_Tags"
    public static TABLE_PRODUCTS_TAGS = "Amaro_Products_Tags"

    public toProductDBModel = (product: Product): IProductDB => {
        const productDB: IProductDB = {
            id: product.getId(),
            name: product.getName()
        }

        return productDB    
    }

    public toProductTagDBModel = (productId: number, tag: string): IProductTagDB => {
        const productTagDB: IProductTagDB = {
            product_id: productId,
            product_tag: tag
        }

        return productTagDB    
    }

    public addProduct = async (product: Product): Promise<void> => {
        const productDB = this.toProductDBModel(product)

        await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .insert(productDB)
    }

    public searchById = async (id: number): Promise<IProductDB | undefined> =>  {
        const productDB: IProductDB[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .select()
            .where({ id: id })

        return productDB[0]
    }

    public searchByTag = async (tag: string): Promise<ITagDB | undefined> =>  {
        const tagDB: ITagDB[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_TAGS)
            .select()
            .where({ tag_name: tag })

        return tagDB[0]
    }

    public addTag = async (tag: string): Promise<void> => {

        await BaseDatabase
            .connection(ProductDatabase.TABLE_TAGS)
            .insert({tag_name: tag})
    }

    public addProductTags = async (productId: number, tag: string): Promise<void> => {
        const productTagDB = this.toProductTagDBModel(productId, tag)

        await BaseDatabase
        .connection(ProductDatabase.TABLE_PRODUCTS_TAGS)
        .insert(productTagDB)
    }


    public getProducts = async (input: IGetProductDBDTO): Promise<IGetProductRawDBDTO[]> => {
        const search = input.search
        const order = input.order
        const sort = input.sort

        const result: IGetProductRawDBDTO[] = await BaseDatabase
            .connection(ProductDatabase.TABLE_PRODUCTS)
            .orderBy(order, sort)
            .join(ProductDatabase.TABLE_PRODUCTS_TAGS, `${ProductDatabase.TABLE_PRODUCTS_TAGS}.product_id`, `${ProductDatabase.TABLE_PRODUCTS}.id`) 
            .where(`name`, `LIKE`, `%${search}%`) 
            .orWhere(`product_id`, `LIKE`, `%${search}%`) 
            .orWhere(`product_tag`, `LIKE`, `%${search}%`)

        return result
    }
}