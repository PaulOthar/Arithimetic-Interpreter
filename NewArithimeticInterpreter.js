/* 	ARITHIMETIC INTERPRETER (Made By Paul)
 * 
 * 	---[Quick Description]---:
 * 
 * 	My Arithimetic Interpreter is an Algorythm That Reads a Simple Equation
 * 	And Turns It into a Functional Formula, That can Be Ran, to return the Desired Value.
 *	
 * 	---[How To Use]---:
 * 
 * 	For Your Convenience, i made a Class With Static Methods
 * 	that can be Called To Run The Process
 * 	Witheout The Need for Instancing Stuff.
 * 
 * 	---[Methods]---:
 * 
 * 	(Returner.BuildTokensFromEquation):
 * 		
 * 		Recives a Equation (String) and a Array Of Variables (Variable).
 * 
 * 		Returns a Array of Tokens (Token), That Can Be Later Turned Into a Equation.
 * 
 * 	 (Returner.BuildNodeFromTokens):
 * 
 * 		Recives a Array of Tokens (Token).
 * 
 * 		Returns a Single Node (Node), That Can Be Ran With The Inner Method (.solve())
 * 		Containing All The Other Nodes Necessary To Complete The Execution of The Equation.
 * 
 * 	(Returner.BuildNodeFromEquation):
 * 
 * 		Recives a Equation (String) and a Array Of Variables (Variable).
 * 
 *  	Returns a Single Node (Node), That Can Be Ran With The Inner Method (.solve())
 * 		Containing All The Other Nodes Necessary To Complete The Execution of The Equation.
 * 	
 * 	---[Suported Operations]---:
 * 
 * 	{Negativation} = 					"- (Equation)"
 * 
 * 	{Negation} = 						"! (Equation)"
 * 
 * 	{Square Root} = 					"sqrt (Equation)"
 * 
 * 	{Sine} = 							"sin (Equation)"
 * 
 * 	{Cossine} = 						"cos (Equation)"
 * 
 *  {Tangent} = 						"tan (Equation)"
 * 
 * 	{Arc Sine} = 						"arcsin (Equation)"
 * 
 * 	{Arc Cossine} = 					"arccos (Equation)"
 * 
 *	{Arc Tangent} = 					"arctan (Equation)"
 * 
 * 	{Degree To Radians} = 				"rad (Equation)"
 * 
 * 	{Radians To Degree} = 				"deg (Equation)"
 * 
 * 	{Length of a Array} = 				"len (Equation)"
 * 
 * 	{Summation of a Array} = 			"sum (Equation)"
 * 
 * 	{Mean of a Array} = 				"mean (Equation)"
 * 
 * 	{Median of a Array} = 				"median (Equation)"
 * 
 * 	{Mode of a Array} = 				"mode (Equation)"
 * 
 * 	{Adition} = 						"(Equation) + (Equation)"
 * 
 * 	{Subtraction} = 					"(Equation) - (Equation)"
 * 
 * 	{Division} = 						"(Equation) / (Equation)"
 * 
 *  {Multiplication} = 					"(Equation) * (Equation)"
 * 
 * 	{Modulus} = 						"(Equation) % (Equation)"
 * 
 * 	{Exponentiation} = 					"(Equation) ** (Equation)"
 * 
 * 	{Equal Comparison} = 				"(Equation) = (Equation)"
 * 
 * 	{Different Comparison} = 			"(Equation) != (Equation)"
 * 
 * 	{Lower Comparison} = 				"(Equation) < (Equation)"
 * 
 * 	{Highter comparison} = 				"(Equation) > (Equation)"
 * 
 *  {Lower Or Equal Comparison} = 		"(Equation) <= (Equation)"
 * 
 * 	{Highter Or Equal Comparison} = 	"(Equation) >= (Equation)"
 * 
 * 	{And Comparison} = 					"(Equation) && (Equation)"
 * 
 * 	{Or Comparsion} = 					"(Equation) || (Equation)"
 * 
 * 	{Function} = 						"{ (Equation) : (Equation) , (Equation) }"
 * 
 * 	{Dice} = 							"{(Equation) , (Equation) , (Equation) , (Equation)}"
 * 
 * 	{Absolute} = 						"| (Equation) |"
 * 
 * 	{Range} = 							"_ (Equation) , (Equation) , (Equation) _"
 * 
 * 	{Join} = 							"(Equation) join (Equation)"
 * 
 * 	{Set Left} = 						"(Equation) <- (Equation)"
 * 
 * 	{Set Right} = 						"(Equation) -> (Equation)"
 * 
 * 	{Repeat} = 							"repeat{ (Equation) : (Equation) }"
 * 
 * 	{Ignore} = 							"ignore{ (Equation) }"
 * 
 * 	{Variable Creation} = 				"new( Name : Value )"
 * 
 * 	{Pi} = 								"PI"
 */ 

class Token{
    Type;
    Value;

    constructor(Type, Value) {
        this.Type = Type;
        this.Value = Value;
    }

    toString() {
        return `${this.Type}:${this.Value}`
    }
    
    //Getters
    
    getType(){
		return this.Type;
	}
	
	getValue(){
		return this.Value;
	}
	
	//Setters
	
	setType(Type){
		this.Type = Type;
	}
	
	setValue(Value){
		this.Value = Value;
	}
}

class Variable{
    Name;
    Value;

    constructor(name,value){
        this.Name = name;
        this.Value = value;
    }

    toString() {
        return `${this.Name}:${this.Value}`;
    }
    
    //Getters
    
    getName(){
        return this.Name;
    }
    
    getValue(){
        return this.Value;
    }
    
    //Setters
    
    setName(Name){
        this.Name = Name;
    }
    
    setValue(Value){
        this.Value = Value;
    }
}

class DataTypes_Dictionary{
	Symbolic_Tokens;	//Array Of (Token) 		Which Value = String
	
	Reserved;			//String
	
	constructor(){
		this.Symbolic_Tokens = new Array();
		this.Named_Tokens = new Array();
		
		this.initializeBasic();
		
		this.Reserved = this.getReservedSymbols();
	}
	
	addSymbolicToken(New_Token){
		this.getSymbolic_Tokens().push(New_Token);
	}
	
	createSymbolicToken(Type,Symbol){
		let New_Token = new Token(Type,Symbol);
		
		this.addSymbolicToken(New_Token);
	}
	
	addSymbolicCombinedToken(Token1,Token2){
		addSymbolicToken(this.combineTokens(Token1,Token2));
	}
	
	combineTokens(Token1,Token2){
		let Type = new String(`${Token1.getType()}_${Token2.getType()}`);
		let Symbol = new String(`${Token1.getValue()}${Token2.getValue()}`);
		let New_Token = new Token(Type,Symbol);
		
		return New_Token;
	}
	
	initializeBasic(){
		//Basic Operations
		this.createSymbolicToken("PLUS","+");
		this.createSymbolicToken("MINUS","-");
		this.createSymbolicToken("MULTIPLY","*");
		this.createSymbolicToken("DIVIDE","/");
		this.createSymbolicToken("MODULUS","%");
		this.createSymbolicToken("POWER","**");
		this.createSymbolicToken("SQUARE_ROOT","sqrt");
		
		this.createSymbolicToken("ABSOLUTE","|");
		
		//Boolean Operations
		this.createSymbolicToken("EQUAL","=");
		this.createSymbolicToken("LOWER","<");
		this.createSymbolicToken("HIGHTER",">");
		
		this.createSymbolicToken("DIFFERENT","!=");
		this.createSymbolicToken("EQUAL_LOWER","<=");
		this.createSymbolicToken("EQUAL_HIGHTER",">=");
		
		this.createSymbolicToken("AND","&&");
		this.createSymbolicToken("OR","||");
		this.createSymbolicToken("NOT","!");
		
		//Hierarchy
		this.createSymbolicToken("L_PARENTHESIS","(");
		this.createSymbolicToken("R_PARENTHESIS",")");
		
		//Structure Operators
		this.createSymbolicToken("L_CURLY_BRACKET","{");
		this.createSymbolicToken("R_CURLY_BRACKET","}");
		
		this.createSymbolicToken("L_SQUARE_BRACKET","[");
		this.createSymbolicToken("R_SQUARE_BRACKET","]");
		
		this.createSymbolicToken("SEPARATOR",",");
		this.createSymbolicToken("RESULT",":");
		this.createSymbolicToken("OPTION",";");
		
		//Trigonometry
		this.createSymbolicToken("SINE","sin");
		this.createSymbolicToken("COSSINE","cos");
		this.createSymbolicToken("TANGENT","tan");
		
		this.createSymbolicToken("ARCSINE","arcsin");
		this.createSymbolicToken("ARCCOSSINE","arccos");
		this.createSymbolicToken("ARCTANGENT","arctan");
		
		this.createSymbolicToken("RADIAN","rad");
		this.createSymbolicToken("DEGREE","deg");
		
		this.createSymbolicToken("PI","PI");
		
		//Array Operations
		this.createSymbolicToken("LENGTH","len");
		this.createSymbolicToken("JOIN","join");
		
		this.createSymbolicToken("SUMMATION","sum");
		
		this.createSymbolicToken("MEAN","mean");
		this.createSymbolicToken("MEDIAN","median");
		this.createSymbolicToken("MODE","mode");
		
		//Special
		this.createSymbolicToken("RANGE","_");
		this.createSymbolicToken("SET_LEFT","<-");
		this.createSymbolicToken("SET_RIGHT","->");
		this.createSymbolicToken("DICE_FUNCTION","?{");
		this.createSymbolicToken("REPEAT_FUNCTION","repeat{");
		this.createSymbolicToken("IGNORE_FUNCTION","ignore{");
		
		//Ultra Special
		this.createSymbolicToken("NEW_VARIABLE","new(");
	}
	
	makeNumberToken(Variable_Reference){
		return new Token("NUMBER",Variable_Reference);
	}
	
	makePrimitiveNumberToken(Value){
		return new Token("PRIMITIVE",Value);
	}
	
	isToken(Symbol){
		for(let i = 0;i<this.getSymbolic_Tokens().length;i++){
			if(Symbol == this.getSymbolic_Tokens()[i].getValue()){
				return true;
			}
		}
		return false;
	}
	
	//Special Getters
	
	getSymbolicToken(Symbol){
		for(let i = 0;i<this.getSymbolic_Tokens().length;i++){
			if(Symbol == this.getSymbolic_Tokens()[i].getValue()){
				return this.getSymbolic_Tokens()[i];
			}
		}
		return false;
	}
	
	getReservedSymbols(){
		let Output = new String();
		for(let i = 0;i<this.getSymbolic_Tokens().length;i++){
			let Current_Symbol = this.getSymbolic_Tokens()[i].getValue();
			
			//A Single Symbol May Have Multiple Characters
			for(let l = 0;l<Current_Symbol.length;l++){
				let Found = false;
				let Current_Char = Current_Symbol[l];
				
				for(let o = 0;o<Output.length;o++){
					let Current_Output_Symbol = Output[o];
					
					if(Current_Char == Current_Output_Symbol){
						Found = true;
						break;
					}
				}
				
				if(!Found){
					Output += Current_Char;
				}
			}
		}
		
		return Output;
	}
	
	//Getters
	
	getSymbolic_Tokens(){
		return this.Symbolic_Tokens;
	}
	
	//Setters
	
	setSymbolic_Tokens(Symbolic_Tokens){
		this.Symbolic_Tokens = Symbolic_Tokens;
	}
	
}

class Lexer{
	static DeprecatedTokenize(Text,Variables,Dictionary){
		let Output = new Array();
		
		let isNumber = false;
		let isVariable = false;
		let isOperation = false;
		
		let Current_Stream = new String()
		
		let prevNumber = false;
		let prevVariable = false;
		let prevOperation = false;
		
		let Previous_Stream = new String();
		
		let FilteredOperations = new Array();
		let FilteredVariables = new Array();
		
		const Numbers = new String(".0123456789");
		
		for(let i = 0;i<Text.length;i++){
			let Current_Char = Text[i];
			
			let Char_Number = false;
			
			//Checks If The Current Char is a Number or Not
			for(let l = 0;l<Numbers.length;l++){
				if(Numbers[l] == Current_Char){
					Char_Number = true;
					break;
				}
			}
			
			if(Current_Stream.length == 0){
				//If This Is The First Iteration of this String Do:
				FilteredOperations = new Array();
				FilteredVariables = new Array();
				
				Current_Stream += Current_Char;
				
				if(Char_Number){
					//If The Current Char is A Number, Do:
					
					isNumber = true;
				}
				else{
					//If The current Char is Not A Number Do:
					
					//For Each Token Do:
					for(let l = 0;l<Dictionary.getSymbolic_Tokens().length;l++){
						if(Current_Char == Dictionary.getSymbolic_Tokens()[l].getValue()[0]){
							//If the Current Char is Equal to the First Symbol of a Token, Do:
							
							isOperation = true;
							FilteredOperations.push(Dictionary.getSymbolic_Tokens()[l]);
							//break;
						}
					}
					
					//For Each Variable Do:
					for(let l = 0;l<Variables.length;l++){
						if(Current_Char == Variables[l].getName()[0]){
							//If The Current Chat is Equal To The First Char Of A Variable, Do:
							
							isVariable = true;
							FilteredVariables.push(Variables[l]);
							//break;
						}
					}
					
					if(FilteredOperations.length == 0 && FilteredVariables == 0){
						Current_Stream = new String();
						continue;
					}
				}
			}
			else{
				//If This Is Not The First Iteration of this String Do:
				
				Current_Stream += Current_Char;
				if(!isNumber || !Char_Number){
					//If The Current Stream is Not A Number, Do:
					isNumber = false;
					if(isOperation){
						//It it Was a Token Do:
						
						let Deeper_FilteredOperations = new Array();
						let Current_Stream_Last_Char = Current_Stream.length-1;
						
						for(let l = 0;l<FilteredOperations.length;l++){
							if(Current_Stream.length <= FilteredOperations[l].getValue().length){
								//If The Current Token Symbol Size is Equal Or Larger Than the Current Stream, Do:
								
								if(FilteredOperations[l].getValue()[Current_Stream_Last_Char] == Current_Stream[Current_Stream_Last_Char]){
									//If The Current Token Symbol In The Same Position as the Current Stream is Equal, Do:
									Deeper_FilteredOperations.push(FilteredOperations[l]);
								}
							}
						}
						if(Deeper_FilteredOperations.length > 0){
							FilteredOperations = Deeper_FilteredOperations;
						}
						else{
							isOperation = false;
						}
						
					}
					if(isVariable){
						//If it Was a Variable Do:
						
						let Deeper_FilteredVariables = new Array();
						let Current_Stream_Last_Char = Current_Stream.length-1;
						
						for(let l = 0;l<FilteredVariables.length;l++){
							if(Current_Stream.length <= FilteredVariables[l].getName().length){
								//If The Current Token Symbol Size is Equal Or Larger Than the Current Stream, Do:
								
								if(FilteredVariables[l].getName()[Current_Stream_Last_Char] == Current_Stream[Current_Stream_Last_Char]){
									//If The Current Token Symbol In The Same Position as the Current Stream is Equal, Do:
									Deeper_FilteredVariables.push(FilteredVariables[l]);
								}
							}
						}
						if(Deeper_FilteredVariables.length > 0){
							FilteredVariables = Deeper_FilteredVariables;
						}
						else{
							isVariable = false;
						}
					}
				}
			}
			
			if(!isNumber && !isVariable && !isOperation && (prevNumber || prevVariable || prevOperation)){
				//If it is Not Anything, But it Were a Character Before, Do:
				if(prevNumber){
					//If it is a Primitive Number:
					Output.push(Dictionary.makePrimitiveNumberToken(parseFloat(Previous_Stream)));
				}
				
				if(prevOperation){
					//If it is a Operation:
					
					let Out = Dictionary.getSymbolicToken(Previous_Stream)
					if(Out){
						//If The Found Token Is Valid:
						Output.push(Out);
					}
				}
				if(prevVariable){
					//If it is a Variable:
					for(let l = 0;l<Variables.length;l++){
						if(Variables[l].getName() == Previous_Stream){
							Output.push(Dictionary.makeNumberToken(Variables[l]));
							break;
						}
					}
				}
				
				
				Current_Stream = new String();
				i = i-1;
			}
			
			if(i+1 == Text.length && Current_Stream.length > 0){
				//If This is The Last Iteration,And there still is a Stream To Process:
				
				if(isNumber){
					//If it is a Number:
					Output.push(Dictionary.makePrimitiveNumberToken(parseFloat(Current_Stream)));
					continue;
				}
				if(isOperation){
					//If it is a Operation:
					
					let Out = Dictionary.getSymbolicToken(Current_Stream);
					if(Out){
						//If The Found Token Is Valid:
						Output.push(Out);
					}
				}
				if(isVariable){
					//If it is a Variable:
					for(let l = 0;l<Variables.length;l++){
						if(Variables[l].getName() == Current_Stream){
							Output.push(Dictionary.makeNumberToken(Variables[l]));
							break;
						}
					}
					
				}
			}
			
			prevNumber = isNumber;
			prevVariable = isVariable;
			prevOperation = isOperation;
			
			Previous_Stream = Current_Stream;
			
			//console.log(Current_Char,`[${isNumber}|${isOperation}|${isVariable}]`,`[${prevNumber}|${prevVariable}|${prevOperation}]`);
		}
		

		return Output;
	}
	
	static Tokenize(Text,Variables,Dictionary){
		let Output = new Array();
		
		let isNumber = false;
		let isVariable = false;
		let isOperation = false;
		
		let Current_Stream = new String();
		
		let prevNumber = false;
		let prevVariable = false;
		let prevOperation = false;
		
		let Previous_Stream = new String();
		
		let FilteredOperations = new Array();
		let FilteredVariables = new Array();
		
		const Numbers = new String(".0123456789");
		
		let newVariable = false;
		let newVariableInitialize = false;
		let newVariableName = new String();
		let New_Variable = new Variable("",0);
		
		for(let i = 0;i<Text.length;i++){
			let Current_Char = Text[i];
			
			if(newVariable){
				if(Current_Char != ")" && Current_Char != ":"){
					Current_Stream += Current_Char;
					continue;
				}
				else if(Current_Char == ":"){
					newVariableInitialize = true;
					newVariableName = Current_Stream;
					Current_Stream = new String();
					continue;
				}
				else if(Current_Char == ")"){
					if(newVariableInitialize){
						New_Variable.setValue(parseFloat(Current_Stream));
					}
					else{
						newVariableName = Current_Stream;
					}
					New_Variable.setName(newVariableName);
					
					Variables.push(New_Variable);
					
					New_Variable = new Variable("",0);
					
					newVariableName = new String();
					
					newVariableInitialize = false;
					
					newVariable = false;
					
					Current_Stream = new String();
					
					isNumber = false;
					isVariable = false;
					isOperation = false;
					
					Previous_Stream = new String();
					
					prevNumber = false;
					prevVariable = false;
					prevOperation = false;
					
					continue;
				}
			}
			
			let Char_Number = false;
			
			//Checks If The Current Char is a Number or Not
			for(let l = 0;l<Numbers.length;l++){
				if(Numbers[l] == Current_Char){
					Char_Number = true;
					break;
				}
			}
			
			if(Current_Stream.length == 0){
				//If This Is The First Iteration of this String Do:
				FilteredOperations = new Array();
				FilteredVariables = new Array();
				
				Current_Stream += Current_Char;
				
				if(Char_Number){
					//If The Current Char is A Number, Do:
					
					isNumber = true;
				}
				else{
					//If The current Char is Not A Number Do:
					
					//For Each Token Do:
					for(let l = 0;l<Dictionary.getSymbolic_Tokens().length;l++){
						if(Current_Char == Dictionary.getSymbolic_Tokens()[l].getValue()[0]){
							//If the Current Char is Equal to the First Symbol of a Token, Do:
							
							isOperation = true;
							FilteredOperations.push(Dictionary.getSymbolic_Tokens()[l]);
							//break;
						}
					}
					
					//For Each Variable Do:
					for(let l = 0;l<Variables.length;l++){
						if(Current_Char == Variables[l].getName()[0]){
							//If The Current Chat is Equal To The First Char Of A Variable, Do:
							
							isVariable = true;
							FilteredVariables.push(Variables[l]);
							//break;
						}
					}
					
					if(FilteredOperations.length == 0 && FilteredVariables == 0){
						Current_Stream = new String();
						continue;
					}
				}
			}
			else{
				//If This Is Not The First Iteration of this String Do:
				
				Current_Stream += Current_Char;
				if(!isNumber || !Char_Number){
					//If The Current Stream is Not A Number, Do:
					isNumber = false;
					if(isOperation){
						//It it Was a Token Do:
						
						let Deeper_FilteredOperations = new Array();
						let Current_Stream_Last_Char = Current_Stream.length-1;
						
						for(let l = 0;l<FilteredOperations.length;l++){
							if(Current_Stream.length <= FilteredOperations[l].getValue().length){
								//If The Current Token Symbol Size is Equal Or Larger Than the Current Stream, Do:
								
								if(FilteredOperations[l].getValue()[Current_Stream_Last_Char] == Current_Stream[Current_Stream_Last_Char]){
									//If The Current Token Symbol In The Same Position as the Current Stream is Equal, Do:
									Deeper_FilteredOperations.push(FilteredOperations[l]);
								}
							}
						}
						if(Deeper_FilteredOperations.length > 0){
							FilteredOperations = Deeper_FilteredOperations;
						}
						else{
							isOperation = false;
						}
						
					}
					if(isVariable){
						//If it Was a Variable Do:
						
						let Deeper_FilteredVariables = new Array();
						let Current_Stream_Last_Char = Current_Stream.length-1;
						
						for(let l = 0;l<FilteredVariables.length;l++){
							if(Current_Stream.length <= FilteredVariables[l].getName().length){
								//If The Current Token Symbol Size is Equal Or Larger Than the Current Stream, Do:
								
								if(FilteredVariables[l].getName()[Current_Stream_Last_Char] == Current_Stream[Current_Stream_Last_Char]){
									//If The Current Token Symbol In The Same Position as the Current Stream is Equal, Do:
									Deeper_FilteredVariables.push(FilteredVariables[l]);
								}
							}
						}
						if(Deeper_FilteredVariables.length > 0){
							FilteredVariables = Deeper_FilteredVariables;
						}
						else{
							isVariable = false;
						}
					}
				}
			}
			
			if(!isNumber && !isVariable && !isOperation && (prevNumber || prevVariable || prevOperation)){
				//If it is Not Anything, But it Were a Character Before, Do:
				if(prevNumber){
					//If it is a Primitive Number:
					Output.push(Dictionary.makePrimitiveNumberToken(parseFloat(Previous_Stream)));
				}
				
				if(prevOperation){
					//If it is a Operation:
					
					let Out = Dictionary.getSymbolicToken(Previous_Stream);
					if(Out){
						//If The Found Token Is Valid:
						
						if(Out.getType() == "NEW_VARIABLE"){
							//Hardcode
							Current_Stream = new String();
							Current_Stream += Current_Char;
							newVariable = true;
							continue;
						}
						
						Output.push(Out);
					}
				}
				if(prevVariable){
					//If it is a Variable:
					for(let l = 0;l<Variables.length;l++){
						if(Variables[l].getName() == Previous_Stream){
							Output.push(Dictionary.makeNumberToken(Variables[l]));
							break;
						}
					}
				}
				
				
				Current_Stream = new String();
				i = i-1;
			}
			
			if(i+1 == Text.length && Current_Stream.length > 0){
				//If This is The Last Iteration,And there still is a Stream To Process:
				
				if(isNumber){
					//If it is a Number:
					Output.push(Dictionary.makePrimitiveNumberToken(parseFloat(Current_Stream)));
					continue;
				}
				if(isOperation){
					//If it is a Operation:
					
					let Out = Dictionary.getSymbolicToken(Current_Stream);
					if(Out){
						//If The Found Token Is Valid:
						Output.push(Out);
					}
				}
				if(isVariable){
					//If it is a Variable:
					for(let l = 0;l<Variables.length;l++){
						if(Variables[l].getName() == Current_Stream){
							Output.push(Dictionary.makeNumberToken(Variables[l]));
							break;
						}
					}
					
				}
			}
			
			prevNumber = isNumber;
			prevVariable = isVariable;
			prevOperation = isOperation;
			
			Previous_Stream = Current_Stream;
			
		}
		

		return Output;
	}
}

class Parser {
	//Hardcoded
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

	current(){
		return this.Current_Token.Type;
	}
	
	compare(Type){
		return this.Current_Token.getType() == Type;
	}
	
	compareMultiple(ArrayOfTypes){
		let Output = false;
		
		for(let i = 0;i<ArrayOfTypes.length;i++){
			if(i == 0){
				Output = this.compare(ArrayOfTypes[i]);
			}
			else{
				Output = Output || this.compare(ArrayOfTypes[i]);
			}
		}

		
		return Output;
	}

    parse() {
        let result = this.Step1();

        return result;
    }
    
    BinaryFunction(){
		let MainOperation = this.Step1();
        let True_Outcome = false;//Optional
        let False_Outcome = false;//Optional
        
        if(this.Continue && this.compare("RESULT")){
            this.advance();
            True_Outcome = this.Step1();
            if(this.Continue && this.compare("SEPARATOR")){
                this.advance();
                False_Outcome = this.Step1();
            }
        }
        
        let result = new FunctionOperationNode(MainOperation,True_Outcome,False_Outcome);
        return result;
	}
    
	AbsoluteFunction(){
		return new AbsoluteOperationNode(this.Step1());
	}
	
	ArrayFunction(){
		let result = new ArrayNode();
        let firstNode = this.Step1();
        result.add(firstNode);
        
        while(this.Continue && this.compare("SEPARATOR")){
            this.advance();
            result.add(this.Step1());
        }
        
        return result;
	}
	
	DiceFunction(){
		let Maximum = this.Step1();
		let Amount = false;//Optional
		let Step = false;//Optional
        let Minimum = false;//Optional
        
        if(this.Continue && this.compare("SEPARATOR")){
            this.advance();
            Amount = this.Step1();
            if(this.Continue && this.compare("SEPARATOR")){
                this.advance();
                Step = this.Step1();
                if(this.Continue && this.compare("SEPARATOR")){
					this.advance();
					Minimum = this.Step1();
				}
            }
        }
        
        let result = new DiceOperationNode(Maximum,Amount,Step,Minimum);
        return result;
	}
	
	RangeFunction(){
		let Minimum = this.Step1();
		this.advance();
		let Maximum = this.Step1();
		let Step = false;//Optional
		
		if(this.Continue && this.compare("SEPARATOR")){
            this.advance();
            Step = this.Step1();
        }
        
        let result = new RangeOperationNode(Minimum,Maximum,Step);
        
        return result;
	}
    
    RepeatFunction(){
		let Amount = this.Step1();
		this.advance();
		let Target = this.Step1();
        
        let result = new RepeatOperationNode(Amount,Target);
        return result;
	}
    
    IgnoreFunction(){
		let result = new IgnoreOperationNode();
        let firstNode = this.Step1();
        result.add(firstNode);
        
        while(this.Continue && this.compare("SEPARATOR")){
            this.advance();
            result.add(this.Step1());
        }
        
        return result;
	}
    
    Step1(){
		let result = this.Step2();
		
		while(this.Continue &&(this.compareMultiple(["EQUAL","LOWER","HIGHTER","DIFFERENT","EQUAL_LOWER","EQUAL_HIGHTER"]))){
			let Symbol = this.Current_Token.getValue();
			this.advance()
			result = new BinaryOperationNode(Symbol,result,this.Step2());
		}
		
		return result;
	}
	
	Step2(){
		let result = this.Step3();
		
		while(this.Continue &&(this.compareMultiple(["AND","OR","JOIN","SET_LEFT","SET_RIGHT"]))){
			let Symbol = this.Current_Token.getValue();
			let Type = this.Current_Token.getType();
			
			this.advance();
			if(Type == "JOIN"){
				result = new JoinOperationNode(result,this.Step3());
			}
			else if(Type == "SET_LEFT"){
				result = new SetOperationNode(this.Step3(),result);
			}
			else if(Type == "SET_RIGHT"){
				result = new SetOperationNode(result,this.Step3());
			}
			else{
				result = new BinaryOperationNode(Symbol,result,this.Step3());
			}
		}
		
		return result;
	}
	
	Step3(){
		let result = this.Step4();
		
		while(this.Continue &&(this.compareMultiple(["PLUS","MINUS"]))){
			let Symbol = this.Current_Token.getValue();
			this.advance();
			result = new BinaryOperationNode(Symbol,result,this.Step4());
		}
		
		return result;
	}
	
	Step4(){
		let result = this.Step5();
		
		while(this.Continue &&(this.compareMultiple(["MULTIPLY","DIVIDE","MODULUS"]))){
			let Symbol = this.Current_Token.getValue();
			this.advance();
			result = new BinaryOperationNode(Symbol,result,this.Step5());
		}
		
		return result;
	}
	
	Step5(){
		let result = this.Step_Master();
		
		while(this.Continue &&(this.compareMultiple(["POWER"]))){
			let Symbol = this.Current_Token.getValue();
			this.advance()
			result = new BinaryOperationNode(Symbol,result,this.Step_Master());
		}
		
		return result;
	}
	
	Step_Master(){
		let token = this.Current_Token;
		
		let result;
		
		switch(token.getType()){
			//Value Operation
			
			case "NUMBER":
				this.advance();
				return new VariableNode(token.getValue());
				
			case "PRIMITIVE":
				this.advance();
				return new PrimitiveNode(token.getValue());
				
			case "PI":
				this.advance();
				return new PiNode();
				
			//Separator Operation
			
			case "L_PARENTHESIS":
				this.advance();
                result = this.Step1();
                this.advance();
                return result;
			
			//Function Operation
			
			case "L_CURLY_BRACKET":
				this.advance();
                result = this.BinaryFunction();
                this.advance();
                return result;
			
			case "ABSOLUTE":
				this.advance();
                result = this.AbsoluteFunction();
                this.advance();
                return result;
                
            case "L_SQUARE_BRACKET":
				this.advance();
                result = this.ArrayFunction();
                this.advance();
                return result;
                
            case "DICE_FUNCTION":
				this.advance();
                result = this.DiceFunction();
                this.advance();
                return result;
                
            case "RANGE":
				this.advance();
                result = this.RangeFunction();
                this.advance();
                return result;
            
            case "REPEAT_FUNCTION":
				this.advance();
				result = this.RepeatFunction();
				this.advance();
				return result;
			
			case "IGNORE_FUNCTION":
				this.advance();
				result = this.IgnoreFunction();
				this.advance();
				return result;
			
			//Single Operation
			
			default:
				this.advance();
				return new UnaryOperationNode(token.getValue(),this.Step_Master());
		}
	}
}

class Returner{
	static Dictionary = new DataTypes_Dictionary();
	
	static BuildTokensFromEquation(Equation,Variables){
		return Lexer.Tokenize(Equation,Variables,Returner.Dictionary);
	}
	
    static BuildNodeFromTokens(Tokens){
        return new Parser(Tokens).parse();
    }

    static BuildNodeFromEquation(Equation,Variables){
        return Returner.BuildNodeFromTokens(Lexer.Tokenize(Equation,Variables,Returner.Dictionary));
    }
}

//Operation Management [I Know It Seems Stupid, But it Makes Sense, Trust Me]
class AbstractOperation{
	Symbol;	//String
	
	constructor(Symbol){
		this.Symbol = Symbol;
	}
}

class Operation extends AbstractOperation{
	solve(Value1,Value2){}	//Abstract
}

class TransformationOperation extends AbstractOperation{
	solve(Value){}	//Abstract
}

class OperationGiver{
	
	//I Know i Could Just Give The Method To Operate,But im a Man With Principles, and one of them is to Make as Much as generic as possible
	static getOperation(Symbol){
		switch(Symbol){
			case "+":
				class op1 extends Operation{
					solve(Value1,Value2){
						return Value1 + Value2;
					}
				}
				return new op1(Symbol);
			case "-":
				class op2 extends Operation{
					solve(Value1,Value2){
						return Value1 - Value2;
					}
				}
				return new op2(Symbol);
			case "*":
				class op3 extends Operation{
					solve(Value1,Value2){
						return Value1 * Value2;
					}
				}
				return new op3(Symbol);
			case "/":
				class op4 extends Operation{
					solve(Value1,Value2){
						return Value1 / Value2;
					}
				}
				return new op4(Symbol);
			case "%":
				class op5 extends Operation{
					solve(Value1,Value2){
						return Value1 % Value2;
					}
				}
				return new op5(Symbol);
			case "**":
				class op6 extends Operation{
					solve(Value1,Value2){
						return Value1 ** Value2;
					}
				}
				return new op6(Symbol);
			case "=":
				class op7 extends Operation{
					solve(Value1,Value2){
						if(Value1 == Value2){
							return 1;
						}
						else{
							return 0;
						}
					}
				}
				return new op7(Symbol);
			case "!=":
				class op8 extends Operation{
					solve(Value1,Value2){
						if(Value1 != Value2){
							return 1;
						}
						else{
							return 0;
						}
					}
				}
				return new op8(Symbol);
			case "<":
				class op9 extends Operation{
					solve(Value1,Value2){
						if(Value1 < Value2){
							return 1;
						}
						else{
							return 0;
						}
					}
				}
				return new op9(Symbol);
			case ">":
				class op10 extends Operation{
					solve(Value1,Value2){
						if(Value1 > Value2){
							return 1;
						}
						else{
							return 0;
						}
					}
				}
				return new op10(Symbol);
			case "<=":
				class op11 extends Operation{
					solve(Value1,Value2){
						if(Value1 <= Value2){
							return 1;
						}
						else{
							return 0;
						}
					}
				}
				return new op11(Symbol);
			case ">=":
				class op12 extends Operation{
					solve(Value1,Value2){
						if(Value1 >= Value2){
							return 1;
						}
						else{
							return 0;
						}
					}
				}
				return new op12(Symbol);
			case "&&":
				class op13 extends Operation{
					solve(Value1,Value2){
						if(Value1 && Value2){
							return 1;
						}
						else{
							return 0;
						}
					}
				}
				return new op13(Symbol);
			case "||":
				class op14 extends Operation{
					solve(Value1,Value2){
						if(Value1 || Value2){
							return 1;
						}
						else{
							return 0;
						}
					}
				}
				return new op14(Symbol);
		}
	}

	static getTransformation(Symbol){
		switch(Symbol){
			
			case "sqrt":
				class op1 extends TransformationOperation{
					solve(Value){
						return Value**(1/2);//Value Powered By 1/2  = Sqrt of Value
					}
				}
				return new op1(Symbol);
				
			case "-":
				class op2 extends TransformationOperation{
					solve(Value){
						return -Value;
					}
				}
				return new op2(Symbol);
				
			case "!":
				class op3 extends TransformationOperation{
					solve(Value){
						if(Value > 0){
							return 0;
						}
						else{
							return 1;
						}
					}
				}
				return new op3(Symbol);
				
			case "sin":
				class op4 extends TransformationOperation{
					solve(Value){
						return Math.sin(Value);
					}
				}
				return new op4(Symbol);
				
			case "cos":
				class op5 extends TransformationOperation{
					solve(Value){
						return Math.cos(Value);
					}
				}
				return new op5(Symbol);
				
			case "tan":
				class op6 extends TransformationOperation{
					solve(Value){
						return Math.tan(Value);
					}
				}
				return new op6(Symbol);
				
			case "arcsin":
				class op7 extends TransformationOperation{
					solve(Value){
						return Math.asin(Value);
					}
				}
				return new op7(Symbol);
				
			case "arccos":
				class op8 extends TransformationOperation{
					solve(Value){
						return Math.acos(Value);
					}
				}
				return new op8(Symbol);
				
			case "arctan":
				class op9 extends TransformationOperation{
					solve(Value){
						return Math.atan(Value);
					}
				}
				return new op9(Symbol);
				
			case "rad":
				class op10 extends TransformationOperation{
					solve(Value){
						return (Value*Math.PI)/180;
					}
				}
				return new op10(Symbol);
				
			case "deg":
				class op11 extends TransformationOperation{
					solve(Value){
						return Value*(180/Math.PI);
					}
				}
				return new op11(Symbol);
		}
	}
	
	static getArrayOperation(Symbol){
		switch(Symbol){
			case "len":
				class op1 extends TransformationOperation{
					solve(Array_Input){
						return Array_Input.length;
					}
				}
				return new op1(Symbol);
			case "sum":
				class op2 extends TransformationOperation{
					solve(Array_Input){
						let Output = 0;
						
						for(let i = 0;i<Array_Input.length;i++){
							Output += Array_Input[i];
						}
						
						return Output;
					}
				}
				return new op2(Symbol);
			case "mean":
				class op3 extends TransformationOperation{
					solve(Array_Input){
						let Output = 0;
						for(let i = 0;i<Array_Input.length;i++){
							Output += Array_Input[i];
						}
						Output /= Array_Input.length;
						return Output;
					}
				}
				return new op3(Symbol);
			case "median":
				class op4 extends TransformationOperation{
					solve(Array_Input){
						//Im Too Lazy To Sort Thing Out, Them i will just return the current median.
						let index = ((Array_Input.length/2)%1)+Array_Input.length/2
						
						return Array_Input[index];
					}
				}
				return new op4(Symbol);
			case "mode":
				class op5 extends TransformationOperation{
					solve(Array_Input){
						let Count_List = new Array();
						let Hightest_Value = 0;
						let Hightest = 0;
						for(let i = 0;i<Array_Input.length;i++){
							let Found = false;
							for(let l = 0;l<Count_List.length;l++){
								if(Count_List[l][0] == Array_Input[i]){
									Count_List[l][1]++;
									
									if(Hightest_Value < Count_List[l][1]){
										Hightest_Value = Count_List[l][1]
										Hightest = Count_List[l][0];
									}
									break;
								}
							}
							if(!Found){
								let New_Number = new Array();
								New_Number.push(Array_Input[i]);
								New_Number.push(1);
								Count_List.push(New_Number);
							}
							
						}
						return Hightest;
					}
				}
				return new op5(Symbol);
		}
	}
}

//Abstract Nodes
class Node {
    constructor(){}
    
    solve(){}		//Abstract
    variables(){}	//Abstract
    toString(){}	//Abstract
    toEquation(){}	//Abstract
    type(){
		return "Node";
	}
}

//Value Nodes
class VariableNode extends Node{
	Variable_Reference;	//Variable
	
	constructor(Variable_Reference) {
		super();
		this.Variable_Reference = Variable_Reference;
	}
	
    solve(){
		let Output = new Array();
		Output.push(this.Variable_Reference.getValue());
		return Output;
	}
    variables(){
		let Output = new Array();
		Output.push(this.Variable_Reference);
		return Output;
	}
	toString(){
		return this.Variable_Reference.toString();
	}
	toEquation(){
		return this.Variable_Reference.getName();
	}
	type(){
		return "VariableNode";
	}
}

class PrimitiveNode extends Node{
	Value;	//Float
	
	constructor(Value){
		super();
		this.Value = Value;
	}
	
	solve(){
		let Output = new Array();
		Output.push(this.Value);
		return Output;
	}
    variables(){
		//It A Primitive Number Is Not a Variable, then it will only Return a Empty Array
		let Output = new Array();
		return Output;
	}
	toString(){
		return `${this.Value}`
	}
	toEquation(){
		return `${this.Value}`
	}
	type(){
		return "PrimitiveNode";
	}
}

class ArrayNode extends Node{
	Nodes;	//Array Of (Node)
	
	constructor(){
		super();
		this.Nodes = new Array();
	}
	
	add(Node){
		this.Nodes.push(Node);
	}
	solve(){
		let Output = new Array();
		
		for(let i = 0;i<this.Nodes.length;i++){
			let Solved = this.Nodes[i].solve();
			for(let l = 0;l<Solved.length;l++){
				Output.push(Solved[l]);
			}
		}
		
		return Output;
	}
    variables(){
		let Output = new Array();
		
		for(let i = 0;i<this.Nodes.length;i++){
			let Node_Variables = this.Nodes.variables();
			
			for(let v = 0;v<Node_Variables.length;v++){
				let Current_Variable = Node_Variables[v];
				let Found = false;
				for(let l = 0;l<Output.length;l++){
					if(Current_Variable == Output[l]){
						Found = true;
						break;
					}
				}
				if(!Found){
					Output.push();
				}
			}
		
		}
		
		return Output;
	}
	toString(){
		let Output = new String();
		Output += "[";
		for(let i = 0;i<this.Nodes.length;i++){
			if(i>0){
				Output += ",";
			}
			Output += this.Nodes.toString();
		}
		Output += "]"
		return Output;
	}
	toEquation(){
		let Output = new String();
		Output += "[";
		for(let i = 0;i<this.Nodes.length;i++){
			if(i>0){
				Output += ",";
			}
			Output += this.Nodes.toEquation();
		}
		Output += "]"
		return Output;
	}
}

class PiNode extends Node{
	solve(){
		let Output = new Array();
		Output.push(Math.PI);
		return Output;
	}
	variables(){
		//Pi Is Not a Variable, then it will only Return a Empty Array
		let Output = new Array();
		return Output;
	}
	toString(){
		return `PI`
	}
	toEquation(){
		return `PI`
	}
}

//Operation Nodes
class UnaryOperationNode extends Node{
	Operation;			//(String)
	OperationRunner;	//(Operation)
	Single_Node;		//(Node)
	
	constructor(Operation,Single_Node){
		super();
		
		this.Operation = Operation;
		this.OperationRunner = OperationGiver.getTransformation(Operation);
		this.Single_Node = Single_Node;
	}
	
	runOperation(Value){
		return this.OperationRunner.solve(Value);
	}
	solve(){
		let Single_Node = this.Single_Node.solve();
		
		let Output = new Array();
		
		for(let i = 0;i<Single_Node.length;i++){
			let Result = 0;
				
			Result = this.runOperation(Single_Node[i]);
				
			Output.push(Result);
		}
		
		return Output;
	}
	variables(){
		let Single_Node = this.Single_Node.variables();
		
		let Output = new Array();
		
		for(let i = 0;i<Single_Node.length;i++){
			let Current_Variable = Single_Node[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		
		return Output;
	}
    toString(){
		return `${this.Operation}${this.Single_Node.toString()}`;
	}
    toEquation(){
		return `${this.Operation}${this.Single_Node.toEquation()}`
	}
}

class BinaryOperationNode extends Node{
	Operation;			//(String)
	OperationRunner;	//(Operation)
	Node_1;				//(Node)
	Node_2;				//(Node)
	
	constructor(Operation,Node_1,Node_2){
		super();
		this.Operation = Operation;
		this.OperationRunner = OperationGiver.getOperation(Operation);
		this.Node_1 = Node_1;
		this.Node_2 = Node_2;
	}
	
	runOperation(Value1,Value2){
		return this.OperationRunner.solve(Value1,Value2);
	}
	solve(){
		let Solved_1 = this.Node_1.solve();
		let Solved_2 = this.Node_2.solve();
		
		let Output = new Array();
		
		for(let i = 0;i<Solved_1.length;i++){
			for(let l = 0;l<Solved_2.length;l++){
				let Result = 0;
				
				Result = this.runOperation(Solved_1[i],Solved_2[l]);
				
				Output.push(Result);
			}
		}
		
		return Output;
	}
	variables(){
		let Variables1 = this.Node_1.variables();
		let Variables2 = this.Node_2.variables();
		let Output = new Array();
		
		for(let i = 0;i<Variables1.length;i++){
			let Current_Variable = Variables1[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		for(let i = 0;i<Variables2.length;i++){
			let Current_Variable = Variables2[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		
		return Output;
	}
    toString(){
		return `${this.Node_1.toString()}${this.Operation}${this.Node_2.toString()}`;
	}
    toEquation(){
		return `${this.Node_1.toEquation()}${this.Operation}${this.Node_2.toEquation()}`
	}
}

class FunctionOperationNode extends Node{
	Condition_Node;	//(Node)
	Result_Node_True;	//(Node)
	Result_Node_False;	//(Node)
	
	constructor(Condition_Node,Result_Node_True,Result_Node_False){
		super();
		this.Condition_Node = Condition_Node;
		
		if(Result_Node_True){
			//If it is Anything But 0,false,NaN,undefined,void and null:
			this.Result_Node_True = Result_Node_True;
		}
		else{
			this.Result_Node_True = new PrimitiveNode(1);
		}
			
		if(Result_Node_False){
			//If it is Anything But 0,false,NaN,undefined,void and null:
			this.Result_Node_False = Result_Node_False;
		}
		else{
			this.Result_Node_False = new PrimitiveNode(0);
		}
	}
	
	solve(){
		let Condition_Solved = this.Condition_Node.solve();
		let SolvedTrue = this.Result_Node_True.solve();
		let SolvedFalse = this.Result_Node_False.solve();
		
		let Output = new Array();
		
		for(let i = 0;i<Condition_Solved.length;i++){
			//Since Booleanism is Treated as 0 and 1, anything Above 0 is True
			if(Condition_Solved[i] > 0){
				for(let l = 0;l<SolvedTrue.length;l++){
					Output.push(SolvedTrue[l]);
				}
			}
			else{
				for(let l = 0;l<SolvedFalse.length;l++){
					Output.push(SolvedFalse[l]);
				}
			}
		}
		
		return Output;
	}
    variables(){
		let Condition_Variables = this.Condition_Node.variables();
		let True_Variables = this.Result_Node_True.variables();
		let False_Variables = this.Result_Node_False.variables();
		
		let Output = new Array();
		
		for(let i = 0;i<Condition_Variables.length;i++){
			let Current_Variable = Condition_Variables[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push();
			}
		}
		
		for(let i = 0;i<Result_Node_True.length;i++){
			let Current_Variable = Result_Node_True[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push();
			}
		}
		
		for(let i = 0;i<Result_Node_False.length;i++){
			let Current_Variable = Result_Node_False[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push();
			}
		}
		
		return Output;
	}
	toString(){
		return `{${this.Condition_Node.toString()}:${this.Result_Node_True.toString()},${this.Result_Node_False.toString()}}`
	}
	toEquation(){
		return `{${this.Condition_Node.toEquation()}:${this.Result_Node_True.toEquation()},${this.Result_Node_False.toEquation()}}`
	}
}

class DiceOperationNode extends Node{
	Maximum_Node;	//(Node)
	Minimum_Node;	//(Node)
	Amount_Node;	//(Node)
	Step_Node;		//(Node)
	
	constructor(Maximum_Node,Amount_Node,Step_Node,Minimum_Node){
		super();
		
		if(Maximum_Node){
			//If it is Anything But 0,false,NaN,undefined,void and null:
			this.Maximum_Node = Maximum_Node;
		}
		else{
			this.Maximum_Node = new PrimitiveNode(6); 
		}
		
		if(Amount_Node){
			//If it is Anything But 0,false,NaN,undefined,void and null:
			this.Amount_Node = Amount_Node;
		}
		else{
			this.Amount_Node = new PrimitiveNode(1); 
		}
		
		if(Step_Node){
			//If it is Anything But 0,false,NaN,undefined,void and null:
			this.Step_Node = Step_Node;
		}
		else{
			this.Step_Node = new PrimitiveNode(1); 
		}
		
		if(Minimum_Node){
			//If it is Anything But 0,false,NaN,undefined,void and null:
			this.Minimum_Node = Minimum_Node;
		}
		else{
			this.Minimum_Node = new PrimitiveNode(1); 
		}
	}
	
	
	numbersInbetween(Minimum,Maximum,ZeroIncluded){
		if(!ZeroIncluded && Minimum < 0 && Maximum > 0){
			//If Minimum is Lower Than Zero, and Maximum is Highter Than Zero, that means that Zero is Between The Two.
			return Maximum-Minimum;
		}
		else{
			return Maximum-Minimum+1;
		}
	}
	rollDice(Maximum,Minimum,Step){
		let Range = this.numbersInbetween(Minimum,Maximum,true);
		return Minimum + Math.floor(Math.random() * Range/Step)*Step;
	}
	solve(){
		let Maximum_Solved = this.Maximum_Node.solve();
		let Minimum_Solved = this.Minimum_Node.solve();
		let Amount_Solved = this.Amount_Node.solve();
		let Step_Solved = this.Step_Node.solve();
		
		let True_Amount = 0;	//Float
		
		for(let i = 0;i<Amount_Solved.length;i++){
			True_Amount += Amount_Solved[i];
		}
		
		let Output = new Array();
		
		for(let Cycle = 0;Cycle<True_Amount;Cycle++){
			for(let min = 0;min<Minimum_Solved.length;min++){
				let Current_Minimum = Minimum_Solved[min];
				for(let max = 0;max<Maximum_Solved.length;max++){
					let Current_Maximum = Maximum_Solved[max];
					for(let step = 0;step<Step_Solved.length;step++){
						let Current_Step = Step_Solved[step];
						
						Output.push(this.rollDice(Current_Maximum,Current_Minimum,Current_Step));
					}
				}
			}
		}
		
		return Output;
	}
    variables(){
		let Maximum_Variables = this.Maximum_Node.variables();
		let Minimum_Variables = this.Minimum_Node.variables();
		let Amount_Variables = this.Amount_Node.variables();
		let Step_Variables = this.Step_Node.variables();
		
		let Output = new Array();
		
		for(let i = 0;i<Maximum_Variables.length;i++){
			let Current_Variable = Maximum_Variables[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push();
			}
		}
		
		for(let i = 0;i<Minimum_Variables.length;i++){
			let Current_Variable = Minimum_Variables[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push();
			}
		}
		
		for(let i = 0;i<Amount_Variables.length;i++){
			let Current_Variable = Amount_Variables[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push();
			}
		}
		
		for(let i = 0;i<Step_Variables.length;i++){
			let Current_Variable = Step_Variables[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push();
			}
		}
		
		return Output;
	}
    toString(){
		return `?{${this.Maximum_Node.toString()},${this.Amount_Node.toString()},${this.Step_Node.toString()},${this.Minimum_Node.toString()}}`;
	}
    toEquation(){
		return `?{${this.Maximum_Node.toEquation()},${this.Amount_Node.toEquation()},${this.Step_Node.toEquation()},${this.Minimum_Node.toEquation()}}`;
	}
	
}

class AbsoluteOperationNode extends Node{
	Single_Node;	//(Node)
	
	constructor(Single_Node){
		super();
		this.Single_Node = Single_Node;
	}
	
	solve(){
		let Single_Node = this.Single_Node.solve();
		
		let Output = new Array();
		
		for(let i = 0;i<Single_Node.length;i++){
			let Result = 0;
				
			Result = Math.abs(Single_Node[i]);
				
			Output.push(Result);
		}
		
		return Output;
	}
	variables(){
		let Single_Node = this.Single_Node.variables();
		
		let Output = new Array();
		
		for(let i = 0;i<Single_Node.length;i++){
			let Current_Variable = Single_Node[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		
		return Output;
	}
    toString(){
		return `|${this.Single_Node.toString()}|`;
	}
    toEquation(){
		return `|${this.Single_Node.toEquation()}|`
	}
}

class RangeOperationNode extends Node{
	Node_Minimum;		//(Node)
	Node_Maximum;		//(Node)
	Step_Node;			//(Node)
	
	constructor(Node_Minimum,Node_Maximum,Step_Node){
		super();
		this.Node_Minimum = Node_Minimum;
		this.Node_Maximum = Node_Maximum;
		if(Step_Node){
			this.Step_Node = Step_Node;
		}
		else{
			this.Step_Node = new PrimitiveNode(1);
		}
	}
	
	solve(){
		let Solved_Minimum = this.Node_Minimum.solve();
		let Solved_Maximum = this.Node_Maximum.solve();
		let Solved_Step = this.Step_Node.solve();
		
		let Output = new Array();
		
		for(let i = 0;i<Solved_Minimum.length;i++){
			for(let l = 0;l<Solved_Maximum.length;l++){
				for(let s = 0;s<Solved_Step.length;s++){
					let Result = new Array();
				
					for(let x = Solved_Minimum[i];x<=Solved_Maximum[l];x+=Solved_Step[s]){
						Result.push(x);
					}
				
					for(let r = 0;r<Result.length;r++){
						Output.push(Result[r]);
					}
				}
			}
		}
		
		return Output;
	}
	variables(){
		let VariablesMinimum = this.Node_Minimum.variables();
		let VariablesMaximum = this.Node_Maximum.variables();
		let VariablesStep = this.Step_Node.variables();
		let Output = new Array();
		
		for(let i = 0;i<VariablesMinimum.length;i++){
			let Current_Variable = VariablesMinimum[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		for(let i = 0;i<VariablesMaximum.length;i++){
			let Current_Variable = VariablesMaximum[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		for(let i = 0;i<VariablesStep.length;i++){
			let Current_Variable = VariablesStep[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		
		return Output;
	}
    toString(){
		return `_${this.Node_Minimum.toString()},${this.Node_Maximum.toString()},${this.Node_2.Step_Node()}_`;
	}
    toEquation(){
		return `_${this.Node_Minimum.toEquation()},${this.Node_Maximum.toEquation()},${this.Node_2.toEquation()}_`;
	}
}

class JoinOperationNode extends Node{
	Node_1;				//(Node)
	Node_2;				//(Node)
	
	constructor(Node_1,Node_2){
		super();
		
		this.Node_1 = Node_1;
		this.Node_2 = Node_2;
	}
	
	solve(){
		let Solved_1 = this.Node_1.solve();
		let Solved_2 = this.Node_2.solve();
		
		let Output = new Array();
		
		for(let i = 0;i<Solved_1.length;i++){
			Output.push(Solved_1[i]);
		}
		for(let i = 0;i<Solved_2.length;i++){
			Output.push(Solved_2[i]);
		}
		
		return Output;
	}
    variables(){
		let Variables1 = this.Node_1.variables();
		let Variables2 = this.Node_2.variables();
		let Output = new Array();
		
		for(let i = 0;i<Variables1.length;i++){
			let Current_Variable = Variables1[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		for(let i = 0;i<Variables2.length;i++){
			let Current_Variable = Variables2[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		
		return Output;
	}
    toString(){
		return `${this.Node_1.toString()} join ${this.Node_2.toString()}`;
	}
    toEquation(){
		return `${this.Node_1.toEquation()} join ${this.Node_2.toEquation()}`
	}
}

class SetOperationNode extends Node{
	Value_Node;
	Target_Node;
	
	constructor(Value_Node,Target_Node){
		super();
		this.Value_Node = Value_Node;
		this.Target_Node = Target_Node;
	}
	
	solve(){
		let Solved_Value = this.Value_Node.solve();
		
		let Target_Type = this.Target_Node.type();
		
		if(Target_Type == "VariableNode"){
			
			this.Target_Node.Variable_Reference.setValue(Solved_Value[0]);
			
			return this.Target_Node.solve();
		}
		else if(Target_Type == "PrimitiveNode"){
			
			this.Target_Node.Value = Solved_Value[0];
			
			return this.Target_Node.solve();
		}
		
		return Solved_Value;
	}
    variables(){
		let Variables1 = this.Value_Node.variables();
		let Variables2 = this.Target_Node.variables();
		let Output = new Array();
		
		for(let i = 0;i<Variables1.length;i++){
			let Current_Variable = Variables1[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		for(let i = 0;i<Variables2.length;i++){
			let Current_Variable = Variables2[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		
		return Output;
	}
    toString(){
		return `${this.Value_Node.toString()} -> ${this.Target_Node.toString()}`;
	}
    toEquation(){
		return `${this.Value_Node.toEquation()} -> ${this.Target_Node.toEquation()}`
	}
}

class RepeatOperationNode extends Node{
	Amount_Node;
	Target_Node;
	
	constructor(Amount_Node,Target_Node){
		super();
		this.Amount_Node = Amount_Node;
		this.Target_Node = Target_Node;
	}
	
	solve(){
		let Solved_Amount = this.Amount_Node.solve();
		
		let Output = new Array();
		
		for(let i = 0;i<Solved_Amount.length;i++){
			let Current_Amount = Solved_Amount[i];
			for(let cycle = 0;cycle<Current_Amount;cycle++){
				let Solved_Target = this.Target_Node.solve();
				
				for(let l = 0;l<Solved_Target.length;l++){
					Output.push(Solved_Target[i]);
				}
			}
		}
		
		return Output;
	}
    variables(){
		let Variables1 = this.Amount_Node.variables();
		let Variables2 = this.Target_Node.variables();
		let Output = new Array();
		
		for(let i = 0;i<Variables1.length;i++){
			let Current_Variable = Variables1[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		for(let i = 0;i<Variables2.length;i++){
			let Current_Variable = Variables2[i];
			let Found = false;
			for(let l = 0;l<Output.length;l++){
				if(Current_Variable == Output[l]){
					Found = true;
					break;
				}
			}
			if(!Found){
				Output.push(Current_Variable);
			}
		}
		
		return Output;
	}
    toString(){
		return `repeat{${this.Amount_Node.toString()}:${this.Target_Node.toString()}}`
	}
    toEquation(){
		return `repeat{${this.Amount_Node.toEquation()}:${this.Target_Node.toEquation()}}`
	}
}

class IgnoreOperationNode extends ArrayNode{
	constructor(){
		super();
	}
	
	solve(){
		let Output = new Array();
		
		for(let i = 0;i<this.Nodes.length;i++){
			let Solved = this.Nodes[i].solve();
		}
		
		Output.push(0);
		
		return Output;
	}
	toString(){
		let Output = new String();
		Output += "ignore{";
		for(let i = 0;i<this.Nodes.length;i++){
			if(i>0){
				Output += ",";
			}
			Output += this.Nodes.toString();
		}
		Output += "}"
		return Output;
	}
	toEquation(){
		let Output = new String();
		Output += "ignore{";
		for(let i = 0;i<this.Nodes.length;i++){
			if(i>0){
				Output += ",";
			}
			Output += this.Nodes.toEquation();
		}
		Output += "}"
		return Output;
	}
}
