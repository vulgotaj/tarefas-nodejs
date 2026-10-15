import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

const tarefas = ["Estudar Node JS", "Estudar JavaScript"]

/* Entendendo Middlewares
  - Está ali no meio após chamar a requisição e antes de enviar a resposta, é o que chamamos de Middleware.
*/

router.use((req: Request, res: Response, next: NextFunction) => {
  console.log("PASSOU PELO MIDDLEWARE GLOBAL")

  return next();
})

function checkTarefa(req: Request, res: Response, next: NextFunction){
  if(!req.body.nome){
    return res.status(400).json({ error: "Nome inválido / Faltando nome"})
  }

  return next();
}

function checkIndexTarefa(req: Request, res: Response, next: NextFunction){
  const tarefa = tarefas[Number(req.params.index)]
  if(!tarefa){
    return res.status(400).json({ error: "Tarefa não encontrada" })
  }

  return next();
}

// Listar todas as tarefas
router.get("/tarefas", (req: Request, res: Response) => {
  res.json(tarefas)
})

// Listar uma tarefa específica
router.get("/tarefa/:index", checkIndexTarefa, (req: Request, res: Response) =>{
  const index = req.params.index

  res.json({
    tarefa: tarefas[Number(index)]
  })
})

// Cadastrar uma nova tarefa
router.post("/tarefa", checkTarefa, (req: Request, res: Response) => {
  const { nome } = req.body;

  console.log(nome)

  tarefas.push(nome)
  res.json(tarefas)
})

// Atualizar uma tarefa
router.put("/tarefa/:index", checkTarefa, checkIndexTarefa, (req: Request, res: Response) => {
  const { index } = req.params
  const { nome } = req.body
  tarefas[Number(index)] = nome;

  res.json(tarefas)
})

// Deletar uma tarefa
router.delete("/tarefa/:index", checkIndexTarefa, (req: Request, res: Response) => {
  const { index } = req.params
  tarefas.splice(Number(index), 1)
  res.json({ message: "TAREFA DELETADA!" })
})

export { router }