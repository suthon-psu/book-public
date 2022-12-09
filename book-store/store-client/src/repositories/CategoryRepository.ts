import Category from "../models/Category";
import { IRepository } from "./IRepository";
import config from "../config";
import axios from 'axios';

export class CategoryRepository implements IRepository<Category> {
  urlPrefix = config.remoteRepositoryUrlPrefix

  async getAll(): Promise<Category[] | null>{
    const result = await axios.get<Category[]>(`${this.urlPrefix}/category`)

    return result.data
  }

  async get(id: number|string): Promise<Category | null>{
    const result = await axios.get<Category>(`${this.urlPrefix}/category/${id}`)
    
    return result.data
  }

  async create(entity: Partial<Category>): Promise<void>{
    const result = await axios.post<Category>(`${this.urlPrefix}/category`, entity)
    console.log(result.data)
  }

  async update(entity: Partial<Category>): Promise<void>{
    const result = await axios.put<Category>(
      `${this.urlPrefix}/category/${entity.id}`, 
      entity
    )
    console.log(result.data)
  }

  async delete(id: number|string): Promise<void>{
    const result = await axios.delete<Category>(`${this.urlPrefix}/category/${id}`)
    console.log(result.data)
  }
}