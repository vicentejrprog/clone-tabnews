function status(request, response) {
  response.status(200).json({ chave: "teste status" });
}

export default status;
