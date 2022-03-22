class Variable{
    Name;
    Value;

    constructor(name,value){
        this.Name = name;
        this.Value = value;
    }

    toString() {
        return `${this.Name}:${this.Value}`
    }
}

class Token {
    Type;
    Value;

    constructor(Type, Value) {
        this.Type = Type;
        this.Value = Value;
    }

    toString() {
        return `${this.Type}:${this.Value}`
    }
}

class DataTypes{
    static NUMBER = "NUMBER";

    static PLUS = "PLUS";
    static MINUS = "MINUS";
    static MULTIPLY = "MULTIPLY";
    static DIVIDE = "DIVIDE";
    static POWER = "POWER";
    static MODULUS = "MODULUS";

    static PLUS_SYMBOL = "+";
    static MINUS_SYMBOL = "-";
    static MULTIPLY_SYMBOL = "*";
    static DIVIDE_SYMBOL = "/";
    static POWER_SYMBOL = "^";
    static MODULUS_SYMBOL = "%";

    static L_PARENTHESIS = "L_PARENTHESIS";
    static R_PARANTHESIS = "R_PARANTHESIS";

    static L_PARENTHESIS_SYMBOL = "(";
    static R_PARANTHESIS_SYMBOL = ")";

    static NUMBERS = "0123456789.";
    static OPERATORS = "+-*/^%()";

    static SPACE = " ";

    static PRIMITIVE = "PRIMITIVE";
}

class Tokenizer {
    static Tokenize(text,Variables) {
        let Output = new Array();

        for (let i = 0, Current_Number = new String(),Current_Variable = new String(),Current_Indexes = new Array(),Previous_Variable = new String(),Previous_Indexes = new Array(), Number = false,Operator = false; i < text.length; i++, Number = false, Operator = false) {
            let Current_Symbol = text[i];

            for (let n = 0; n < DataTypes.NUMBERS.length; n++) {
                if (Current_Symbol == DataTypes.NUMBERS[n]) {
                    Number = true;
                    Current_Number += Current_Symbol;
                    break;
                }
            }
            if (Number) {
                if (i + 1 == text.length) {
                    Output.push(new Token(DataTypes.NUMBER, new Variable(DataTypes.PRIMITIVE,parseFloat(Current_Number))));
                }
                continue;
            }
            else {
                if (Current_Number.length > 0) {
                    Output.push(new Token(DataTypes.NUMBER, new Variable(DataTypes.PRIMITIVE,parseFloat(Current_Number))));
                    Current_Number = new String();
                }
                switch (Current_Symbol) {
                    case DataTypes.PLUS_SYMBOL:
                        Output.push(new Token(DataTypes.PLUS, Current_Symbol));
                        Operator = true;
                        break;
                    case DataTypes.MINUS_SYMBOL:
                        Output.push(new Token(DataTypes.MINUS, Current_Symbol));
                        Operator = true;
                        break;
                    case DataTypes.MULTIPLY_SYMBOL:
                        Output.push(new Token(DataTypes.MULTIPLY, Current_Symbol));
                        Operator = true;
                        break;
                    case DataTypes.DIVIDE_SYMBOL:
                        Output.push(new Token(DataTypes.DIVIDE, Current_Symbol));
                        Operator = true;
                        break;
                    case DataTypes.POWER_SYMBOL:
                        Output.push(new Token(DataTypes.POWER, Current_Symbol));
                        Operator = true;
                        break;
                    case DataTypes.MODULUS_SYMBOL:
                        Output.push(new Token(DataTypes.MODULUS, Current_Symbol));
                        Operator = true;
                        break;
                    case DataTypes.L_PARENTHESIS_SYMBOL:
                        Output.push(new Token(DataTypes.L_PARENTHESIS, Current_Symbol));
                        Operator = true;
                        break;
                    case DataTypes.R_PARANTHESIS_SYMBOL:
                        Output.push(new Token(DataTypes.R_PARANTHESIS, Current_Symbol));
                        Operator = true;
                        break;
                    //If it was not identified as a Number, Nor Operator:
                    default:
                        if(Current_Variable.length == 0){
                            for(let VariableIndex = 0;VariableIndex<Variables.length;VariableIndex++){
                                if(Current_Symbol == Variables[VariableIndex].Name[0]){
                                    if(Current_Variable.length == 0){
                                        Current_Variable += Current_Symbol;
                                        Current_Indexes.push(VariableIndex);
                                        continue;
                                    }
                                    else{
                                        Current_Indexes.push(VariableIndex);
                                    }
                                }
                            }
                        }
                        else{
                            let Filtered = new Array();

                            for(let IndexIndex = 0;IndexIndex < Current_Indexes.length; IndexIndex++){
                                let Current_Index = Current_Indexes[IndexIndex];
                                let Current_Word = Variables[Current_Index].Name;
                                if(Current_Word.length >= Current_Variable.length){
                                    if(Current_Symbol == Current_Word[Current_Variable.length]){
                                        Filtered.push(Current_Index);
                                    }
                                }
                            }

                            if(Filtered.length != 0){
                                if(Current_Indexes.length != Filtered.length){
                                    Previous_Indexes = Current_Indexes;
                                    Previous_Variable = Current_Variable;
                                }
                                Current_Indexes = Filtered;
                                Current_Variable += Current_Symbol;
                            }
                            
                        }
                        break;
                }
                
            }
            if(Current_Variable.length == 0){
                continue;
            }
            let Outputed = false;
            if(Operator){
                for(let IndexIndex = 0;IndexIndex < Current_Indexes.length; IndexIndex++){
                    let Current_Index = Current_Indexes[IndexIndex];
                    if(Variables[Current_Index].Name == Current_Variable){
                        let TransferToken = Output.pop();
                        Output.push(new Token(DataTypes.NUMBER, Variables[Current_Index]));
                        Output.push(TransferToken);
                        Outputed = true;
                        break;
                    }
                }
                if(!Outputed){
                    for(let IndexIndex = 0;IndexIndex < Previous_Indexes.length; IndexIndex++){
                        let Current_Index = Previous_Indexes[IndexIndex];
                        if(Variables[Current_Index].Name == Previous_Variable){
                            let TransferToken = Output.pop();
                            Output.push(new Token(DataTypes.NUMBER, Variables[Current_Index]));
                            Output.push(TransferToken);
                            Outputed = true;
                            break;
                        }
                    }
                }
                Current_Indexes = new Array();
                Previous_Indexes = new Array();
                Current_Variable = new String();
            }
            else if(i + 1 == text.length){
                for(let IndexIndex = 0;IndexIndex < Current_Indexes.length; IndexIndex++){
                    let Current_Index = Current_Indexes[IndexIndex];
                    if(Variables[Current_Index].Name == Current_Variable){
                        Output.push(new Token(DataTypes.NUMBER, Variables[Current_Index]));
                        Outputed = true;
                        break;
                    }
                }
                if(!Outputed){
                    for(let IndexIndex = 0;IndexIndex < Previous_Indexes.length; IndexIndex++){
                        let Current_Index = Previous_Indexes[IndexIndex];
                        if(Variables[Current_Index].Name == Previous_Variable){
                            Output.push(new Token(DataTypes.NUMBER, Variables[Current_Index]));
                            Outputed = true;
                            break;
                        }
                    }
                }
            }
        }

        return Output;
    }
}

class Node {
    constructor() { }
    represent() { }//Abstract
    solve() { }//Abstract
    variables(){}//Abstract
}

class SolitaryNode extends Node {
    value;

    constructor(value) {
        super();
        this.value = value;
    }

    represent() {
        return this.value;
    }
    solve() {
        return this.value.Value;
    }
    variables(){
        return [this];
    }
}

class PolarizedNode extends Node {
    node;
    pole;

    constructor(node, pole) {
        super();
        this.node = node;
        this.pole = pole;
    }

    represent() {
        return `(${this.pole}${this.node.represent()})`;
    }
    solve() {
        let solved_node = this.node.solve();

        if (this.pole == DataTypes.MINUS_SYMBOL) {
            solved_node *= -1;
        }

        return solved_node;
    }
    variables(){
        return [this.node.variables()];
    }
}

class OperationNode extends Node {
    node_1;
    node_2;
    operation;

    constructor(node1, node2, operation) {
        super();
        this.node_1 = node1;
        this.node_2 = node2;
        this.operation = operation;
    }

    represent() {
        return `(${this.node_1.represent()}${this.operation}${this.node_2.represent()})`;
    }
    solve() {
        let solved1 = this.node_1.solve();
        let solved2 = this.node_2.solve();
        switch (this.operation) {
            case DataTypes.PLUS_SYMBOL:
                return solved1 + solved2
            case DataTypes.MINUS_SYMBOL:
                return solved1 - solved2
            case DataTypes.MULTIPLY_SYMBOL:
                return solved1 * solved2;
            case DataTypes.DIVIDE_SYMBOL:
                return solved1 / solved2;
            case DataTypes.POWER_SYMBOL:
                return solved1 ** solved2;
            case DataTypes.MODULUS_SYMBOL:
                return solved1 % solved2;
        }
    }
    variables(){
        let Variables1 = this.node_1.variables();
        let Variables2 = this.node_2.variables();
        let VariablesArray = new Array();

        for(let i = 0;i<Variables1.length;i++){
            VariablesArray.push(Variables1[i]);
        }
        for(let i = 0;i<Variables2.length;i++){
            VariablesArray.push(Variables2[i]);
        }

        return VariablesArray;
    }
}

class Parser {
    Tokens;
    Position;
    Current_Token;
    Continue;

    constructor(tokens) {
        this.Tokens = tokens;
        this.Position = 0;
        this.Current_Token = tokens[0];
        this.Continue = true;
    }

    advance() {
        this.Position++;
        this.Current_Token = this.Tokens[this.Position];

        if (this.Position == this.Tokens.length) {
            this.Continue = false;
        }
    }

    parse() {
        let result = this.priority1();

        return result;
    }

    priority1() {
        let result = this.priority2();

        while (this.Continue && (this.Current_Token.Type == DataTypes.PLUS || this.Current_Token.Type == DataTypes.MINUS)) {
            if (this.Current_Token.Type == DataTypes.PLUS) {
                this.advance();
                result = new OperationNode(result, this.priority2(), DataTypes.PLUS_SYMBOL);
            }
            else if (this.Current_Token.Type == DataTypes.MINUS) {
                this.advance();
                result = new OperationNode(result, this.priority2(), DataTypes.MINUS_SYMBOL);
            }
        }

        return result;
    }

    priority2() {
        let result = this.priority3();

        while (this.Continue && (this.Current_Token.Type == DataTypes.MULTIPLY || this.Current_Token.Type == DataTypes.DIVIDE || this.Current_Token.Type == DataTypes.MODULUS)) {
            if (this.Current_Token.Type == DataTypes.MULTIPLY) {
                this.advance();
                result = new OperationNode(result, this.priority3(), DataTypes.MULTIPLY_SYMBOL);
            }
            else if (this.Current_Token.Type == DataTypes.DIVIDE) {
                this.advance();
                result = new OperationNode(result, this.priority3(), DataTypes.DIVIDE_SYMBOL);
            }
            else if (this.Current_Token.Type == DataTypes.MODULUS) {
                this.advance();
                result = new OperationNode(result, this.priority3(), DataTypes.MODULUS_SYMBOL);
            }
        }

        return result;
    }

    priority3() {
        let result = this.HighestPriority();

        while (this.Continue && (this.Current_Token.Type == DataTypes.POWER)) {
            this.advance();
            result = new OperationNode(result, this.HighestPriority(), DataTypes.POWER_SYMBOL);
        }

        return result;
    }

    HighestPriority() {
        let token = this.Current_Token;

        switch (token.Type) {
            case DataTypes.L_PARENTHESIS:
                this.advance();
                let result = this.priority1();
                this.advance();
                return result;
            case DataTypes.NUMBER:
                this.advance();
                return new SolitaryNode(token.Value);
            case DataTypes.PLUS:
                this.advance();
                return new PolarizedNode(this.HighestPriority(), DataTypes.PLUS_SYMBOL);
            case DataTypes.MINUS:
                this.advance();
                return new PolarizedNode(this.HighestPriority(), DataTypes.MINUS_SYMBOL);
        }
    }
}

class Returner{
    static BuildNodeFromTokens(Tokens){
        return new Parser(Tokens).parse();
    }

    static BuildNodeFromEquation(Equation,Variables){
        return Returner.BuildNodeFromTokens(Tokenizer.Tokenize(Equation,Variables));
    }
}
