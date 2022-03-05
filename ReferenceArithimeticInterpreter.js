/*

This Should Generate Node Trees With REFERENCED VALUES.

Wich means that it will point to a memory reference, instead of making copies of values.

*/

class Variable{
    Name;
    Value;

    constructor(Name,Value){
        this.Name = Name;
        this.Value = Value;
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

class Tokenizer {
    static NUMBER = "NUMBER";

    static PLUS = "PLUS";
    static MINUS = "MINUS";
    static MULTIPLY = "MULTIPLY";
    static DIVIDE = "DIVIDE";
    static L_PARENTHESIS = "L_PARENTHESIS";
    static R_PARANTHESIS = "R_PARANTHESIS";
    static POWER = "POWER";
    static MODULUS = "MODULUS";

    static NUMBERS = "0123456789.";
    static OPERATORS = "+-*/()^%";

    static SPACE = " ";

    static textIntoTokens(text) {
        let Output = new Array();

        for (let i = 0, Current_Number = "", Number = false; i < text.length; i++, Number = false) {
            let Current_Symbol = text[i];


            for (let n = 0; n < Tokenizer.NUMBERS.length; n++) {
                if (Current_Symbol == Tokenizer.NUMBERS[n]) {
                    Number = true;
                    Current_Number += Current_Symbol;
                    break;
                }
            }
            if (Number) {
                if (i + 1 == text.length) {
                    Output.push(new Token(Tokenizer.NUMBER, parseFloat(Current_Number)));
                }
                continue;
            }
            else {
                if (Current_Number.length > 0) {
                    Output.push(new Token(Tokenizer.NUMBER, parseFloat(Current_Number)));
                    Current_Number = "";
                }
                switch (Current_Symbol) {
                    case Tokenizer.OPERATORS[0]:
                        Output.push(new Token(Tokenizer.PLUS, Current_Symbol));
                        break;
                    case Tokenizer.OPERATORS[1]:
                        Output.push(new Token(Tokenizer.MINUS, Current_Symbol));
                        break;
                    case Tokenizer.OPERATORS[2]:
                        Output.push(new Token(Tokenizer.MULTIPLY, Current_Symbol));
                        break;
                    case Tokenizer.OPERATORS[3]:
                        Output.push(new Token(Tokenizer.DIVIDE, Current_Symbol));
                        break;
                    case Tokenizer.OPERATORS[4]:
                        Output.push(new Token(Tokenizer.L_PARENTHESIS, Current_Symbol));
                        break;
                    case Tokenizer.OPERATORS[5]:
                        Output.push(new Token(Tokenizer.R_PARANTHESIS, Current_Symbol));
                        break;
                    case Tokenizer.OPERATORS[6]:
                        Output.push(new Token(Tokenizer.POWER, Current_Symbol));
                        break;
                    case Tokenizer.OPERATORS[7]:
                        Output.push(new Token(Tokenizer.MODULUS, Current_Symbol));
                        break;
                }
            }
        }

        return Output;
    }

    static textWithVariablesIntoTokens(text,Variables) {
        //Variables = [Variable1,Variable2...]
        let Output = new Array();

        for (let i = 0, Current_Number = "",Current_Variable = "",Current_Indexes = new Array(),Previous_Variable = "",Previous_Indexes = new Array(), Number = false,Operator = false; i < text.length; i++, Number = false, Operator = false) {
            let Current_Symbol = text[i];

            for (let n = 0; n < Tokenizer.NUMBERS.length; n++) {
                if (Current_Symbol == Tokenizer.NUMBERS[n]) {
                    Number = true;
                    Current_Number += Current_Symbol;
                    break;
                }
            }
            if (Number) {
                if (i + 1 == text.length) {
                    Output.push(new Token(Tokenizer.NUMBER, new Variable("Raw",parseFloat(Current_Number))));
                }
                continue;
            }
            else {
                if (Current_Number.length > 0) {
                    Output.push(new Token(Tokenizer.NUMBER, new Variable("Raw",parseFloat(Current_Number))));
                    Current_Number = "";
                }
                switch (Current_Symbol) {
                    case Tokenizer.OPERATORS[0]:
                        Output.push(new Token(Tokenizer.PLUS, Current_Symbol));
                        Operator = true;
                        break;
                    case Tokenizer.OPERATORS[1]:
                        Output.push(new Token(Tokenizer.MINUS, Current_Symbol));
                        Operator = true;
                        break;
                    case Tokenizer.OPERATORS[2]:
                        Output.push(new Token(Tokenizer.MULTIPLY, Current_Symbol));
                        Operator = true;
                        break;
                    case Tokenizer.OPERATORS[3]:
                        Output.push(new Token(Tokenizer.DIVIDE, Current_Symbol));
                        Operator = true;
                        break;
                    case Tokenizer.OPERATORS[4]:
                        Output.push(new Token(Tokenizer.L_PARENTHESIS, Current_Symbol));
                        Operator = true;
                        break;
                    case Tokenizer.OPERATORS[5]:
                        Output.push(new Token(Tokenizer.R_PARANTHESIS, Current_Symbol));
                        Operator = true;
                        break;
                    case Tokenizer.OPERATORS[6]:
                        Output.push(new Token(Tokenizer.POWER, Current_Symbol));
                        Operator = true;
                        break;
                    case Tokenizer.OPERATORS[7]:
                        Output.push(new Token(Tokenizer.MODULUS, Current_Symbol));
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
                        Output.push(new Token(Tokenizer.NUMBER, Variables[Current_Index]));
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
                            Output.push(new Token(Tokenizer.NUMBER, Variables[Current_Index]));
                            Output.push(TransferToken);
                            Outputed = true;
                            break;
                        }
                    }
                }
                Current_Indexes = new Array();
                Previous_Indexes = new Array();
                Current_Variable = "";
            }
            else if(i + 1 == text.length){
                for(let IndexIndex = 0;IndexIndex < Current_Indexes.length; IndexIndex++){
                    let Current_Index = Current_Indexes[IndexIndex];
                    if(Variables[Current_Index].Name == Current_Variable){
                        Output.push(new Token(Tokenizer.NUMBER, Variables[Current_Index]));
                        Outputed = true;
                        break;
                    }
                }
                if(!Outputed){
                    for(let IndexIndex = 0;IndexIndex < Previous_Indexes.length; IndexIndex++){
                        let Current_Index = Previous_Indexes[IndexIndex];
                        if(Variables[Current_Index].Name == Previous_Variable){
                            Output.push(new Token(Tokenizer.NUMBER, Variables[Current_Index]));
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

        if (this.pole == "-") {
            solved_node *= -1;
        }

        return solved_node;
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
            case Tokenizer.OPERATORS[0]:
                return solved1 + solved2
            case Tokenizer.OPERATORS[1]:
                return solved1 - solved2
            case Tokenizer.OPERATORS[2]:
                return solved1 * solved2;
            case Tokenizer.OPERATORS[3]:
                return solved1 / solved2;
            case Tokenizer.OPERATORS[6]:
                return solved1 ** solved2;
            case Tokenizer.OPERATORS[7]:
                return solved1 % solved2;
        }
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

        while (this.Continue && (this.Current_Token.Type == Tokenizer.PLUS || this.Current_Token.Type == Tokenizer.MINUS)) {
            if (this.Current_Token.Type == Tokenizer.PLUS) {
                this.advance();
                result = new OperationNode(result, this.priority2(), "+");
            }
            else if (this.Current_Token.Type == Tokenizer.MINUS) {
                this.advance();
                result = new OperationNode(result, this.priority2(), "-");
            }
        }

        return result;
    }

    priority2() {
        let result = this.priority3();

        while (this.Continue && (this.Current_Token.Type == Tokenizer.MULTIPLY || this.Current_Token.Type == Tokenizer.DIVIDE || this.Current_Token.Type == Tokenizer.MODULUS)) {
            if (this.Current_Token.Type == Tokenizer.MULTIPLY) {
                this.advance();
                result = new OperationNode(result, this.priority3(), "*");
            }
            else if (this.Current_Token.Type == Tokenizer.DIVIDE) {
                this.advance();
                result = new OperationNode(result, this.priority3(), "/");
            }
            else if (this.Current_Token.Type == Tokenizer.MODULUS) {
                this.advance();
                result = new OperationNode(result, this.priority3(), "%");
            }
        }

        return result;
    }

    priority3() {
        let result = this.HighestPriority();

        while (this.Continue && (this.Current_Token.Type == Tokenizer.POWER)) {
            this.advance();
            result = new OperationNode(result, this.HighestPriority(), "^");
        }

        return result;
    }

    HighestPriority() {
        let token = this.Current_Token;

        switch (token.Type) {
            case Tokenizer.L_PARENTHESIS:
                this.advance();
                let result = this.priority1();
                this.advance();
                return result;
            case Tokenizer.NUMBER:
                this.advance();
                return new SolitaryNode(token.Value);
            case Tokenizer.PLUS:
                this.advance();
                return new PolarizedNode(this.HighestPriority(), "+");
            case Tokenizer.MINUS:
                this.advance();
                return new PolarizedNode(this.HighestPriority(), "-");
        }
    }
}

let Parsero = new Parser(Tokenizer.textWithVariablesIntoTokens("Força + 5 * 3 / Resistencia - Resistencia A Fogo",[new Variable("Força",3),new Variable("Resistencia",5),new Variable("Resistencia A Fogo",1)]));

console.log(Parsero.parse().solve());