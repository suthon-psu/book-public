import Repo from './repositories'

async function execute(){
  //list
  const bookList = await Repo.books.getAll()
  console.log(`Book List = `, bookList)

  //get
  const book = await Repo.books.get(1)
  console.log(`Book = `, book)

  //create
  await Repo.books.create(
    {
      title: 'The Hobbit',
      price: 500,
      stockAmount: 20, 
      category: {
        id: 1
      }
    }
  )

  //update
  await Repo.books.update(
    {
      id: 1,
      price: 490,
      stockAmount: 2
    }
  )

  //delete
  await Repo.books.delete(2)
}

execute()
