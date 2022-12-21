# amaro-backend

Trabalho para conclusão de curso Bootcamp Labenu 2022 feito a partir do [Desafio back-end AMARO](https://github.com/amaroteam/back-end-challenge)

 Esta API permite a inserção de dados de produtos enviados em um arquivo JSON ou XML ao banco de dados. Esses dados podem ser pesquisados e filtrados por queries como "id", "name" ou "tags", ordenados por ordem crescente "ASC" ou descrescente "DESC"
 

 ## Funcionalidades
 **1. Inserção de produtos**
 
* **Método 1:** `POST `
* **Caminho:** `/products/new `
* **Entrada:**  body json incluindo os dados do produto no formato: 
```
{
  "products": [
    {
      "id": number,
      "name": string,
      "tags": [string]
 }, 
 ```
 * **Saída:** "Produtos adicionados com sucesso" caso não haja um produco cadastrado com a mesma id ou erro em caso de duplicidade: "já há um produto cadastrado com a ID {product ID}: {product Name}"

<br/>

* **Método 2:** `POST `
* **Caminho:** `/products/new/XML `
* **Entrada:**  body XML incluindo os dados do produto no formato: 
```<?xml version="1.0" encoding="UTF-8"?>
<products>
    <element>
        <id>number</id>
        <name>string</name>
        <tags>
            <element>string</element>
            <element>string</element>
        </tags>
    </element>
</products>, 
```
* **Saída:** "Produtos adicionados com sucesso" caso não haja um produco cadastrado com a mesma id ou erro em caso de duplicidade: "já há um produto cadastrado com a ID {product ID}: {product Name}"

<br/>
 
 **2. Busca por produtos**
 
* **Método:** `GET `
* **Caminho:** `/products`
* **Entrada:**  queries opcionais de search, sort, order e page
* **Saída:** um objeto 'products' que inclui uma lista com todos os produtos encontrados
   
<br/>

## Documentação
[Postman](https://documenter.getpostman.com/view/21553413/2s8Z6u3ZxF#f0391fe4-8eb0-455c-a515-4b52622db3a9)
 
 <br/>
 
 ## Tecnologias Utilizadas
 * NodeJS
 * TypeScript
 * MySQL
 * Knex
 * Express
 * Cors
 * JWT
 * Markdown
 * Jest

Backend rodando na AWS ec2
