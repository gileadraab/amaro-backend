import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { BaseError } from "../errors/BaseError";
import { IAddProductInputDTO, IAddProductXMLInputDTO, IGetProductInputDTO } from "../models/Products";


export class ProductController {
    constructor(
        private productBusiness: ProductBusiness
    ) {}

    public addProduct = async (req: Request, res: Response) => {
        try {
            const inputProducts: IAddProductInputDTO[] = req.body.products

            const response = await this.productBusiness.addProduct(inputProducts)

            res.status(201).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado" })
        }
    }

    public addProductXml = async (req: Request, res: Response) => {
        try {
            const inputProducts: IAddProductXMLInputDTO[] = req.body.products.element

            const products: IAddProductInputDTO[] = []

            inputProducts.map((product: IAddProductXMLInputDTO) => {
              const id: number = Number(product.id[0])
              const name: string = product.name[0]
              const tags: string[] = product.tags[0].element
        
              const newProduct: IAddProductInputDTO = {
                id,
                name,
                tags
              }
        
              products.push(newProduct)
            })

            const response = await this.productBusiness.addProduct(products)

            res.status(201).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado" })
        }
    }


    public getProducts = async (req: Request, res: Response) => {
        try {

            const input: IGetProductInputDTO = {
                search: req.query.search as string,
                order: req.query.order as string,
                sort: req.query.sort as string,
            }

            const response = await this.productBusiness.getProducts(input)

            res.status(201).send(response)

        } catch (error) {
            if (error instanceof BaseError) {
                return res.status(error.statusCode).send({ message: error.message })
            }
            res.status(500).send({ message: "Erro inesperado" })
        }
    }
}