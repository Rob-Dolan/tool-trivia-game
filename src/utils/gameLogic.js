export const generateQuestion = (tools, usedToolIds = []) => {
  // Filter out previously used tools
  const availableTools = tools.filter(tool => !usedToolIds.includes(tool.name));
  
  if (availableTools.length === 0) {
    throw new Error('No more unique tools available');
  }

  const correct = availableTools[Math.floor(Math.random() * availableTools.length)];
  let options = [correct.name];
  
  // For wrong options, we can use any tool name (including used ones) except the correct answer
  const allToolNames = tools.map(t => t.name).filter(name => name !== correct.name);
  
  while (options.length < 4) {
    const candidate = allToolNames[Math.floor(Math.random() * allToolNames.length)];
    if (!options.includes(candidate)) {
      options.push(candidate);
    }
  }
  
  options = options.sort(() => Math.random() - 0.5);
  
  return { correct, options };
};

export const updateScore = (current, isCorrect, isHard, streak) => {
  if (!isCorrect) return { newScore: current, bonus: 0 };

  let base = 100;
  let bonus = 0;

  if (isHard) bonus += 25;
  if ((streak + 1) % 3 === 0) bonus += 50;

  return { newScore: current + base + bonus, bonus };
};