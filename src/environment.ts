interface Environment {
  PORT: number; 
}

const environment: Environment = {
  PORT: Number(process.env.PORT) || 3400,
};

export default environment;
