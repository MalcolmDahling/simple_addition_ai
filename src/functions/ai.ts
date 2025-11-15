// --- Helper functions ---
function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

function sigmoidDerivative(x: number): number {
  return x * (1 - x);
}

function dot(a: number[], b: number[]): number {
  return a.reduce((sum, ai, i) => sum + ai * b[i], 0);
}

function randomMatrix(rows: number, cols: number): number[][] {
  return Array(rows)
    .fill(0)
    .map(() =>
      Array(cols)
        .fill(0)
        .map(() => Math.random() * 2 - 1),
    );
}

// --- Binary encoding ---
function toBinary(n: number, bits: number): number[] {
  return Array.from({ length: bits }, (_, i) => (n >> (bits - i - 1)) & 1);
}

function fromBinary(arr: number[]): number {
  return arr.reduce((sum, bit, i) => sum + bit * (1 << (arr.length - i - 1)), 0);
}

// --- Neural network ---
type Network = {
  inputSize: number;
  hiddenSize: number;
  hiddenSize2: number;
  outputSize: number;
  w1: number[][];
  w2: number[][];
  w3: number[][];
  b1: number[];
  b2: number[];
  b3: number[];
  lr: number;
};

// Initialize
function createNetwork(inputSize: number, hiddenSize: number, hiddenSize2: number, outputSize: number, lr = 0.5): Network {
  return {
    inputSize,
    hiddenSize,
    hiddenSize2,
    outputSize,
    w1: randomMatrix(inputSize, hiddenSize),
    w2: randomMatrix(hiddenSize, hiddenSize2),
    w3: randomMatrix(hiddenSize2, outputSize),
    b1: Array(hiddenSize).fill(0),
    b2: Array(hiddenSize2).fill(0),
    b3: Array(outputSize).fill(0),
    lr,
  };
}

// Forward pass
function forward(net: Network, input: number[]): { h1: number[]; h2: number[]; output: number[] } {
  const h1 = net.w1[0].map((_, j) =>
    sigmoid(
      dot(
        input,
        net.w1.map((row) => row[j]),
      ) + net.b1[j],
    ),
  );
  const h2 = net.w2[0].map((_, j) =>
    sigmoid(
      dot(
        h1,
        net.w2.map((row) => row[j]),
      ) + net.b2[j],
    ),
  );
  const output = net.w3[0].map((_, j) =>
    sigmoid(
      dot(
        h2,
        net.w3.map((row) => row[j]),
      ) + net.b3[j],
    ),
  );
  return { h1, h2, output };
}

// Train one sample
function trainOne(net: Network, input: number[], target: number[]): Network {
  const { h1, h2, output } = forward(net, input);

  // Output layer
  const outErr = output.map((o, i) => target[i] - o);
  const outDelta = outErr.map((e, i) => e * sigmoidDerivative(output[i]));

  // Second hidden layer
  const h2Err = net.w3.map((wRow, i) => outDelta.reduce((sum, od, j) => sum + od * wRow[j], 0));
  const h2Delta = h2Err.map((e, i) => e * sigmoidDerivative(h2[i]));

  // First hidden layer
  const h1Err = net.w2.map((wRow, i) => h2Delta.reduce((sum, hd, j) => sum + hd * wRow[j], 0));
  const h1Delta = h1Err.map((e, i) => e * sigmoidDerivative(h1[i]));

  // Update weights and biases
  for (let i = 0; i < net.hiddenSize2; i++) {
    for (let j = 0; j < net.outputSize; j++) {
      net.w3[i][j] += net.lr * outDelta[j] * h2[i];
    }
  }
  for (let j = 0; j < net.outputSize; j++) net.b3[j] += net.lr * outDelta[j];

  for (let i = 0; i < net.hiddenSize; i++) {
    for (let j = 0; j < net.hiddenSize2; j++) {
      net.w2[i][j] += net.lr * h2Delta[j] * h1[i];
    }
  }
  for (let j = 0; j < net.hiddenSize2; j++) net.b2[j] += net.lr * h2Delta[j];

  for (let i = 0; i < net.inputSize; i++) {
    for (let j = 0; j < net.hiddenSize; j++) {
      net.w1[i][j] += net.lr * h1Delta[j] * input[i];
    }
  }
  for (let j = 0; j < net.hiddenSize; j++) net.b1[j] += net.lr * h1Delta[j];

  return net;
}

// Train on dataset
export function train(net: Network, data: { x: number[]; y: number[] }[], epochs: number): Network {
  let state = net;
  for (let epoch = 0; epoch < epochs; epoch++) {
    for (const sample of data) state = trainOne(state, sample.x, sample.y);
  }
  return state;
}

// Predict sum
export function predict(net: Network, a: number, b: number): number {
  const input = [...toBinary(a, 4), ...toBinary(b, 4)];
  const { output } = forward(net, input);
  const bin = output.map((v) => (v > 0.5 ? 1 : 0));
  return fromBinary(bin);
}

// --- Create dataset 0–15 ---
export const dataset: { x: number[]; y: number[] }[] = [];
for (let i = 0; i <= 15; i++) {
  for (let j = 0; j <= 15; j++) {
    dataset.push({
      x: [...toBinary(i, 4), ...toBinary(j, 4)],
      y: toBinary(i + j, 5),
    });
  }
}

// --- Train network ---
export const net = createNetwork(8, 32, 32, 5, 0.5);
