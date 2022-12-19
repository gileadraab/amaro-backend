import { IGetProductDBDTO, IGetProductRawDBDTO, IProductDB, IProductTagDB, ITagDB, Product } from "../../src/models/Products"
import { BaseDatabase } from "../../src/database/BaseDatabase"

export class ProductDatabaseMock extends BaseDatabase {
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

    public addProduct = async (product: Product): Promise<void> => {}

    public searchById = async (id: number): Promise<IProductDB | undefined> =>  {
        if (id == 12345678) {
            return {
                id: 12345678,
                name: "Duplicated Product",
            }
        }
    }

    public searchByTag = async (tag: string): Promise<ITagDB | undefined> =>  {
        const tagDB: ITagDB[] = await BaseDatabase
            .connection(ProductDatabaseMock.TABLE_TAGS)
            .select()
            .where({ tag_name: tag })

        return tagDB[0]
    }

    public addTag = async (tag: string): Promise<void> => {}

    public addProductTags = async (productId: number, tag: string): Promise<void> => {
        const productTagDB = this.toProductTagDBModel(productId, tag)
    }


    public getProducts = async (input: IGetProductDBDTO): Promise<IGetProductRawDBDTO[]> => {
        const search = input.search
        const order = input.order
        const sort = input.sort

        const result: IGetProductRawDBDTO[] = await BaseDatabase
            .connection(ProductDatabaseMock.TABLE_PRODUCTS)
            .orderBy(order, sort)
            .join(ProductDatabaseMock.TABLE_PRODUCTS_TAGS, `${ProductDatabaseMock.TABLE_PRODUCTS_TAGS}.product_id`, `${ProductDatabaseMock.TABLE_PRODUCTS}.id`) 
            .where(`name`, `LIKE`, `%${search}%`) 
            .orWhere(`product_id`, `LIKE`, `%${search}%`) 
            .orWhere(`product_tag`, `LIKE`, `%${search}%`)

        return result
    }
}