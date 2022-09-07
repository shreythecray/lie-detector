const { requestId } = await courier.send({
  message: {
    to: {
      email: "courier.demos+liedetector@gmail.com",
    },
    content: {
      title: "Mule Identified!",
      body: "Beware! The mule's name is {{name}}.",
    },
    data: {
      name: name,
    },
    routing: {
      method: "single",
      channels: ["email"],
    },
  },
});
