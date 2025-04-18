import { resolve } from 'path';
const __dirname = import.meta.dirname;

var config = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: resolve(__dirname, "dist"),
        filename: "main.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: [
                    'ts-loader'
                ]
            },
        ]
    }
};

export default config