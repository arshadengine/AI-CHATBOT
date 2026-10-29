// C++ OOP [ADPC303] Unit 5: Exception Handling and Templates
// Comprehensive Adaptive Question Bank & Syllabus Data
// Candidate: Samiksha Kakade | Faculty: Mr. Chandan Prasad
// Zeal College of Engineering and Research, Pune

const SYLLABUS_UNITS = [
  {
    id: 1,
    title: "Unit 1: Fundamentals of OOP",
    topics: ["Procedural vs OOP", "Classes & Objects", "Access Specifiers (public, private, protected)", "Constructors & Destructors", "Friend Functions & Classes", "Inline Functions", "Static Members"],
    description: "Core paradigms of Object Oriented Programming, encapsulation, object lifetimes, and memory management."
  },
  {
    id: 2,
    title: "Unit 2: Inheritance",
    topics: ["Single & Multilevel Inheritance", "Multiple & Hierarchical Inheritance", "Hybrid Inheritance", "Ambiguity Resolution (Scope Resolution)", "Virtual Base Classes", "Constructor Order in Derived Classes"],
    description: "Reusability and hierarchical abstraction through public, protected, and private inheritance."
  },
  {
    id: 3,
    title: "Unit 3: Polymorphism",
    topics: ["Compile-time Polymorphism", "Function & Operator Overloading", "Unary & Binary Operator Overloading", "Runtime Polymorphism", "Virtual Functions & VTABLE", "Pure Virtual Functions & Abstract Classes", "Virtual Destructors"],
    description: "Static and dynamic binding, virtual method dispatch, and interface design using abstract base classes."
  },
  {
    id: 4,
    title: "Unit 4: Files and Streams",
    topics: ["C++ Stream Class Hierarchy", "File Stream Classes (ifstream, ofstream, fstream)", "File Modes (in, out, app, binary)", "File Pointers & Manipulators (seekg, seekp, tellg, tellp)", "Error Handling in File Operations"],
    description: "Persistent storage, sequential and random file access, formatted and unformatted I/O."
  },
  {
    id: 5,
    title: "Unit 5: Exception Handling & Templates",
    topics: ["try, catch, and throw keywords", "Multiple Catch Handlers & catch(...)", "Standard Exception Hierarchy (std::exception, what())", "Custom Exception Classes", "Stack Unwinding & RAII", "noexcept & Destructor Safety", "Function Templates & Type Deduction", "Class Templates & Out-of-Class Methods", "Non-Type Template Parameters", "Template Specialization (Full vs Partial)"],
    description: "Robust error handling and type-independent generic programming. Primary focus for CIE-2 Assessment (5 Marks)."
  },
  {
    id: 6,
    title: "Unit 6: Standard Template Library (STL)",
    topics: ["STL Architecture (Containers, Iterators, Algorithms)", "Sequential Containers (vector, deque, list)", "Associative Containers (set, multiset, map, multimap)", "Unordered Containers", "Iterators & Categories", "STL Algorithms (sort, find, count, transform)"],
    description: "Generic container data structures, iterator protocols, and high-performance algorithms."
  }
];

const CODE_SNIPPETS = [
  {
    id: "try_catch_basic",
    title: "Try-Catch Exception Handling",
    unit: "Unit 5",
    tags: ["Exception Handling", "Basics"],
    code: `#include <iostream>
#include <stdexcept>

double divide(double a, double b) {
    if (b == 0.0) {
        throw std::runtime_error("Math Error: Division by zero!");
    }
    return a / b;
}

int main() {
    try {
        std::cout << "10 / 2 = " << divide(10, 2) << "\\n";
        std::cout << "10 / 0 = " << divide(10, 0) << "\\n";
    } catch (const std::exception& e) {
        std::cerr << "Caught Exception: " << e.what() << "\\n";
    }
    std::cout << "Program continues safely without crashing!\\n";
    return 0;
}`,
    explanation: "Demonstrates throwing std::runtime_error and catching it via const std::exception reference to inspect the diagnostic what() string."
  },
  {
    id: "custom_exception",
    title: "Custom User-Defined Exception Class",
    unit: "Unit 5",
    tags: ["Exception Handling", "OOP"],
    code: `#include <iostream>
#include <exception>
#include <string>

class InvalidAgeException : public std::exception {
private:
    std::string message;
public:
    InvalidAgeException(int age) {
        message = "Invalid Age Error: " + std::to_string(age) + " is not eligible for voter registration.";
    }
    const char* what() const noexcept override {
        return message.c_str();
    }
};

void checkEligibility(int age) {
    if (age < 18) throw InvalidAgeException(age);
    std::cout << "Eligible to vote!\\n";
}

int main() {
    try {
        checkEligibility(16);
    } catch (const InvalidAgeException& e) {
        std::cerr << e.what() << "\\n";
    }
    return 0;
}`,
    explanation: "Custom exception class publicly inheriting from std::exception and overriding the virtual const char* what() const noexcept method."
  },
  {
    id: "stack_unwinding_raii",
    title: "Stack Unwinding & RAII Resource Safety",
    unit: "Unit 5",
    tags: ["Exception Handling", "Advanced"],
    code: `#include <iostream>
#include <memory>
#include <stdexcept>

class DatabaseConnection {
public:
    DatabaseConnection() { std::cout << "DB Connection Opened.\\n"; }
    ~DatabaseConnection() { std::cout << "DB Connection Closed (Cleaned up by Stack Unwinding!).\\n"; }
};

void executeTransaction() {
    DatabaseConnection db; // Local object on stack
    std::cout << "Processing transaction...\\n";
    throw std::runtime_error("Network Timeout during transaction!");
    // db destructor is GUARANTEED to execute during stack unwinding!
}

int main() {
    try {
        executeTransaction();
    } catch (const std::exception& e) {
        std::cerr << "Transaction failed: " << e.what() << "\\n";
    }
    return 0;
}`,
    explanation: "Demonstrates how C++ stack unwinding guarantees automatic destruction of local objects (RAII), preventing resource and connection leaks."
  },
  {
    id: "function_template",
    title: "Generic Function Template",
    unit: "Unit 5",
    tags: ["Templates", "Generics"],
    code: `#include <iostream>
#include <string>

template <typename T>
T findMax(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << "Max Int: " << findMax(15, 27) << "\\n";
    std::cout << "Max Double: " << findMax(3.1415, 2.7182) << "\\n";
    std::cout << "Max String: " << findMax(std::string("Zeal"), std::string("College")) << "\\n";
    return 0;
}`,
    explanation: "A single generic function template instantiated by the compiler for int, double, and std::string with full type safety."
  },
  {
    id: "class_template_stack",
    title: "Generic Class Template (Custom Stack)",
    unit: "Unit 5",
    tags: ["Templates", "Data Structures"],
    code: `#include <iostream>
#include <vector>
#include <stdexcept>

template <typename T>
class GenericStack {
private:
    std::vector<T> elements;
public:
    void push(const T& item) {
        elements.push_back(item);
    }
    T pop() {
        if (elements.empty()) {
            throw std::out_of_range("Stack<T>::pop(): stack is empty!");
        }
        T top = elements.back();
        elements.pop_back();
        return top;
    }
    bool isEmpty() const { return elements.empty(); }
};

int main() {
    try {
        GenericStack<std::string> names;
        names.push("Samiksha");
        names.push("AI & DS");
        std::cout << names.pop() << "\\n";
        std::cout << names.pop() << "\\n";
        names.pop(); // Throws out_of_range exception!
    } catch (const std::exception& e) {
        std::cerr << "Exception: " << e.what() << "\\n";
    }
    return 0;
}`,
    explanation: "Class template defining a generic stack that works for any data type and uses standard exception throwing for error handling."
  },
  {
    id: "template_specialization",
    title: "Full Template Specialization",
    unit: "Unit 5",
    tags: ["Templates", "Advanced"],
    code: `#include <iostream>
#include <string>

// Primary Template
template <typename T>
class Formatter {
public:
    static void print(T val) {
        std::cout << "Standard Format: " << val << "\\n";
    }
};

// Full Explicit Specialization for bool
template <>
class Formatter<bool> {
public:
    static void print(bool val) {
        std::cout << "Boolean Format: " << (val ? "TRUE [PASS]" : "FALSE [FAIL]") << "\\n";
    }
};

int main() {
    Formatter<int>::print(100);
    Formatter<double>::print(98.6);
    Formatter<bool>::print(true); // Invokes explicit specialization!
    return 0;
}`,
    explanation: "Shows explicit template specialization with 'template <>' overriding the implementation specifically for bool."
  }
];

const QUESTION_BANK = [
  // ==========================================
  // LEVEL 1: FOUNDATION / EASY QUESTIONS
  // ==========================================
  {
    id: "eh_easy_1",
    unit: "Unit 5: Exception Handling",
    topic: "Exception Handling Fundamentals",
    difficulty: "easy",
    level: 1,
    question: "Welcome Samiksha! Let's start with the fundamentals. Can you explain the roles of the 'try', 'catch', and 'throw' keywords in C++? How does execution flow when an error occurs?",
    shortPrompt: "Explain the roles of try, catch, and throw in C++.",
    codeSnippet: `// Example flow:
try {
    int age = 15;
    if (age < 18) {
        throw "Access denied: Underage!";
    }
} catch (const char* msg) {
    std::cout << msg << std::endl;
}`,
    expectedKeywords: ["try", "catch", "throw", "error", "exception", "handler", "flow", "block", "transfers", "runtime"],
    modelAnswer: "In C++, exception handling is structured around three keywords: \n1. 'try': Encloses a block of code where exceptions might be detected. \n2. 'throw': Used to signal (raise) an exception when an abnormal condition occurs. Execution immediately halts at the throw statement and searches for an appropriate catch block.\n3. 'catch': Defines an exception handler that catches the thrown exception object and handles it gracefully, preventing program crash.",
    followUpHigh: "Excellent explanation! When an exception is thrown inside a nested function, what mechanism does C++ use to unwind the stack and destroy local variables?",
    followUpLow: "You're on the right track. Remember: 'throw' signals the error, 'try' encloses risky code, and 'catch' handles the error. Can you describe what happens to the statements in the try block located AFTER the throw statement?",
    rubricCriteria: {
      concept: "Clear definition of try, catch, and throw",
      flow: "Understanding of execution diversion upon throwing",
      syntax: "Recognition of block structure and parameter matching"
    }
  },
  {
    id: "tmpl_easy_1",
    unit: "Unit 5: Templates",
    topic: "Function Templates & Generic Code",
    difficulty: "easy",
    level: 1,
    question: "Great! Now let's test generic programming. What is a Function Template in C++, and why is it preferred over using C-style macros (#define) or writing multiple overloaded functions?",
    shortPrompt: "What is a Function Template and its advantages over macros and overloading?",
    codeSnippet: `template <typename T>
T findMax(T a, T b) {
    return (a > b) ? a : b;
}
// Called as: findMax(10, 20); or findMax(3.14, 2.71);`,
    expectedKeywords: ["template", "generic", "type safety", "macro", "overloading", "reusability", "compiler", "instantiation", "deduction", "type"],
    modelAnswer: "A Function Template is a blueprint that allows the compiler to generate type-specific functions based on the argument types passed. \nAdvantages over Macros: Templates are fully type-safe and evaluated at compile-time with proper scope rules and debugging symbols, whereas macros are simple text replacements prone to side-effects (e.g. macro expansion issues like MAX(x++, y)).\nAdvantages over Function Overloading: Write once, run for any type. Prevents code duplication and maintenance overhead.",
    followUpHigh: "Spot on! How does the compiler know which concrete function to instantiate when you call findMax(5, 12)? What is this process called?",
    followUpLow: "Think about type-safety and code reusability. A macro just replaces text blindly. How does a template help the compiler perform type checking?",
    rubricCriteria: {
      concept: "Definition of function template as a blueprint",
      macroComparison: "Type-safety and compile-time checks over text substitution",
      overloadingComparison: "DRY principle (Don't Repeat Yourself) across data types"
    }
  },
  {
    id: "eh_easy_2",
    unit: "Unit 5: Exception Handling",
    topic: "Multiple Catch Blocks & Catch-All",
    difficulty: "easy",
    level: 1,
    question: "In C++, a single try block can have multiple catch blocks. What is the catch-all handler 'catch(...)', and where must it be positioned in the catch chain?",
    shortPrompt: "Explain multiple catch blocks and the position/purpose of catch(...).",
    codeSnippet: `try {
    // some code
} catch (int e) {
    std::cout << "Integer error";
} catch (const std::exception& e) {
    std::cout << "Standard error";
} catch (...) {
    std::cout << "Default catch-all handler";
}`,
    expectedKeywords: ["catch-all", "ellipsis", "default", "last", "order", "any type", "unhandled", "fallback", "catch(...)"],
    modelAnswer: "The ellipsis catch handler 'catch(...)' is a default catch-all handler that catches any thrown exception regardless of its data type (primitive, class, pointer). It must ALWAYS be placed as the LAST catch block. If placed earlier, it would mask and intercept subsequent specific catch blocks, causing compiler errors or unreachable code warnings.",
    followUpHigh: "Exactly right. In modern C++, why is catching by 'const reference' (e.g., catch(const std::exception& e)) considered best practice compared to catching by value?",
    followUpLow: "Notice the three dots '...'. It matches ANY type of thrown exception. If you placed it at the top, would the other catch blocks ever be reached?",
    rubricCriteria: {
      positioning: "Identifies that catch(...) must be placed last",
      purpose: "Acts as a safety net / fallback handler",
      orderImportance: "Understands catch matching order"
    }
  },

  // ==========================================
  // LEVEL 2: INTERMEDIATE QUESTIONS
  // ==========================================
  {
    id: "eh_med_1",
    unit: "Unit 5: Exception Handling",
    topic: "Standard Exception Hierarchy & Custom Exceptions",
    difficulty: "medium",
    level: 2,
    question: "Let's explore the C++ Standard Exception Hierarchy. What is the base class for standard exceptions, what does the virtual member function 'what()' do, and how do you create a custom exception class?",
    shortPrompt: "Explain std::exception, what() method, and custom exception creation.",
    codeSnippet: `#include <iostream>
#include <exception>

class DivideByZeroException : public std::exception {
public:
    const char* what() const noexcept override {
        return "Custom Error: Division by zero is undefined!";
    }
};`,
    expectedKeywords: ["std::exception", "what()", "override", "virtual", "noexcept", "custom", "inherit", "runtime_error", "logic_error", "const char*"],
    modelAnswer: "'std::exception' is the root base class located in the <exception> header. \n1. 'what()': A virtual member function returning a 'const char*' describing the error message. Derived classes override it to provide specific diagnostic text.\n2. Standard Hierarchy: Divides into 'std::logic_error' (bugs detectable before runtime, like out_of_range, invalid_argument) and 'std::runtime_error' (events only detectable at runtime, like overflow_error, system_error).\n3. Custom Exceptions: Inherit publicly from 'std::exception' or 'std::runtime_error', and override 'const char* what() const noexcept override'.",
    followUpHigh: "Superb! Notice the 'noexcept' keyword on the what() override. Why is it vital that an exception's what() method never throws an exception itself?",
    followUpLow: "Think about OOP inheritance: we inherit from 'std::exception' and override its virtual 'what()' method to return our custom error string.",
    rubricCriteria: {
      baseClass: "Names std::exception and describes its role",
      whatMethod: "Explains virtual const char* what() const noexcept",
      customException: "Demonstrates inheritance and method overriding"
    }
  },
  {
    id: "tmpl_med_1",
    unit: "Unit 5: Templates",
    topic: "Class Templates & Out-of-Class Member Definitions",
    difficulty: "medium",
    level: 2,
    question: "How do you define a Class Template in C++ (for instance, a generic Stack or Vector)? And how is a member function defined OUTSIDE the class template declaration?",
    shortPrompt: "Explain Class Template definition and out-of-class member function syntax.",
    codeSnippet: `template <typename T>
class Stack {
private:
    T arr[100];
    int top;
public:
    Stack() : top(-1) {}
    void push(T val);
    T pop();
};

// How do we define push() outside the class?`,
    expectedKeywords: ["template <typename T>", "class template", "scope resolution", "Stack<T>::", "instantiation", "member function", "generic class"],
    modelAnswer: "A Class Template is defined with 'template <typename T> class ClassName { ... };'. When defining a member function outside the class definition, you must repeat the template parameter specification before the function and qualify the class name with '<T>' before the scope resolution operator '::'. \nSyntax:\ntemplate <typename T>\nvoid Stack<T>::push(T val) {\n    arr[++top] = val;\n}",
    followUpHigh: "Crisp answer! Can class templates also accept non-type template parameters, like passing an integer array size at compile-time?",
    followUpLow: "Don't forget that outside the class, the class name isn't just 'Stack', it's 'Stack<T>'. And each function definition must be prefixed with 'template <typename T>'.",
    rubricCriteria: {
      classTemplateSyntax: "Correct template <typename T> class syntax",
      outOfClassSyntax: "Correct template <typename T> ReturnType Class<T>::func() syntax",
      genericInstantiation: "Understands concrete specialization (e.g. Stack<int> s;)"
    }
  },
  {
    id: "tmpl_med_2",
    unit: "Unit 5: Templates",
    topic: "Non-Type Template Parameters",
    difficulty: "medium",
    level: 2,
    question: "What are Non-Type Template Parameters in C++? Give a practical example where passing a non-type parameter (such as an integer) is advantageous over standard function arguments.",
    shortPrompt: "Explain Non-Type Template Parameters with a practical example.",
    codeSnippet: `template <typename T, int Size>
class StaticArray {
    T data[Size]; // Allocated at compile-time!
public:
    int getSize() const { return Size; }
};

StaticArray<int, 50> myArray;`,
    expectedKeywords: ["non-type", "compile-time", "constant", "size", "integer", "std::array", "memory", "allocation", "fixed", "template parameter"],
    modelAnswer: "A Non-Type Template Parameter is a template parameter that represents a compile-time constant value rather than a type name. Standard types permitted include integral types (int, size_t, char), pointers, and lvalue references.\nPractical Advantage: Allows static sizing of fixed arrays (like 'std::array<T, N>') where array storage is allocated directly on the stack without dynamic heap overhead ('new'/'delete'), and bounds can be checked or optimized at compile-time.",
    followUpHigh: "Great point! In C++20, what new types can now be used as non-type template parameters? (e.g., floating-point, literal class types)?",
    followUpLow: "Notice in 'StaticArray<int, 50>', 'int' is a type parameter, but '50' is a literal value known at compile time. That is a non-type parameter.",
    rubricCriteria: {
      definition: "Defines non-type parameter as compile-time value",
      typesAllowed: "Mentions integers/pointers/constants",
      advantage: "Zero-cost abstraction, stack allocation, compile-time optimization"
    }
  },

  // ==========================================
  // LEVEL 3: ADVANCED / EXPERT QUESTIONS
  // ==========================================
  {
    id: "eh_hard_1",
    unit: "Unit 5: Exception Handling",
    topic: "Stack Unwinding, RAII, and Destructor Safety",
    difficulty: "hard",
    level: 3,
    question: "Now for a senior-level concept: Explain Stack Unwinding in C++. What happens to local objects when an exception propagates? And critically: why should Destructors NEVER throw exceptions in C++?",
    shortPrompt: "Explain Stack Unwinding, RAII, and why destructors must never throw exceptions.",
    codeSnippet: `void process() {
    Resource r1; // Allocated on stack
    Resource r2;
    throw std::runtime_error("Failure!");
    // What happens to r2 and r1?
    // What if r1's destructor also throws an exception?
}`,
    expectedKeywords: ["stack unwinding", "destructor", "RAII", "std::terminate", "two exceptions", "two active exceptions", "noexcept", "leak", "clean up"],
    modelAnswer: "1. Stack Unwinding: When an exception is thrown, the C++ runtime searches backwards up the call stack for an enclosing try-catch block. As each stack frame is exited, destructors of all fully-constructed local stack objects in that scope are automatically called in reverse order of their creation. This guarantees RAII cleanup.\n2. Why Destructors Must Never Throw: If an exception is already in flight (during stack unwinding) and a destructor of an unwinding object also throws an exception, C++ is faced with two concurrent active unhandled exceptions. Since C++ cannot handle two simultaneous active exceptions, it immediately invokes 'std::terminate()', aborting the entire program. In C++11 onwards, all destructors are implicitly 'noexcept(true)'.",
    followUpHigh: "Brilliant! How does std::unique_ptr or std::lock_guard leverage RAII and stack unwinding to prevent resource and memory leaks during an exception?",
    followUpLow: "Consider this: If one exception is already unwinding the stack, and a destructor throws a SECOND exception, can C++ catch both at once? What function gets called?",
    rubricCriteria: {
      stackUnwinding: "Accurate description of scope exit and destructor invocation",
      dualException: "Identifies that two simultaneous exceptions cause std::terminate()",
      raiiConnection: "Connects stack unwinding to safe resource cleanup"
    }
  },
  {
    id: "tmpl_hard_1",
    unit: "Unit 5: Templates",
    topic: "Template Specialization (Full vs Partial Specialization)",
    difficulty: "hard",
    level: 3,
    question: "Explain the difference between Full (Explicit) Template Specialization and Partial Template Specialization. Can function templates be partially specialized in standard C++?",
    shortPrompt: "Compare Full vs Partial Template Specialization, and function template constraints.",
    codeSnippet: `// Primary Template
template <typename T> class Printer { ... };

// Specialization 1:
template <> class Printer<char*> { ... }; // Which one is this?

// Specialization 2:
template <typename T> class Printer<T*> { ... }; // And this?`,
    expectedKeywords: ["full specialization", "partial specialization", "explicit", "function template", "overloading", "pointer", "primary template", "template <>"],
    modelAnswer: "1. Full (Explicit) Specialization: Overrides the template implementation for one specific concrete type. Written as 'template <> class Printer<char*>'. All template parameters are fully resolved.\n2. Partial Specialization: Specializes a template for a subset or family of types while leaving one or more parameters generic (e.g. 'template <typename T> class Printer<T*>' specializes for all pointer types, or 'template <typename T> class Pair<T, int>').\n3. Function Templates Constraint: In standard C++, Function Templates CANNOT be partially specialized! They can only be fully specialized or overloaded. Partial specialization is strictly reserved for Class/Struct templates.",
    followUpHigh: "Phenomenal! If we need partial specialization behavior for a function template, how can we emulate it? (Hint: delegate to a helper struct or use function overloading).",
    followUpLow: "Look at the syntax: 'template <>' with all arguments supplied in '<char*>' is Full specialization. When some parameter '<T*>' remains generic, it is Partial specialization.",
    rubricCriteria: {
      fullVsPartial: "Differentiates explicit (all types fixed) vs partial (subset of types)",
      functionRule: "States clearly that function templates cannot be partially specialized",
      workaround: "Knows that function overloading or helper structs are used instead"
    }
  },
  {
    id: "eh_hard_2",
    unit: "Unit 5: Exception Handling",
    topic: "Exception Safety Guarantees & noexcept",
    difficulty: "hard",
    level: 3,
    question: "In professional C++ software engineering (like the STL), what are the three levels of Exception Safety Guarantees? Also, what does the 'noexcept' specifier tell the compiler?",
    shortPrompt: "Detail the 3 Exception Safety Guarantees (Basic, Strong, Nothrow) and noexcept.",
    codeSnippet: `void swap(MyClass& a, MyClass& b) noexcept {
    // Guaranteed not to throw!
}
// 1. Basic Guarantee
// 2. Strong Guarantee ("commit-or-rollback")
// 3. No-throw / Nothrow Guarantee`,
    expectedKeywords: ["basic guarantee", "strong guarantee", "nothrow", "no-throw", "noexcept", "rollback", "invariants", "leak", "std::terminate", "optimization"],
    modelAnswer: "The three standard Exception Safety Guarantees (coined by David Abrahams) are:\n1. Basic Guarantee: If an exception is thrown, no resources (memory, locks) are leaked, and all objects remain in a valid, well-defined state (invariants preserved).\n2. Strong Guarantee ('Commit or Rollback'): The operation succeeds completely, or if an exception is thrown, the program state is rolled back to exactly what it was prior to the function call (like a database transaction).\n3. Nothrow (No-fail) Guarantee: The function is guaranteed NEVER to throw an exception under any circumstance (e.g., destructors, move constructors, deallocations).\n'noexcept' tells the compiler that the function will not emit exceptions, allowing aggressive compiler optimizations (like vector reallocation using move rather than copy) and calling std::terminate() immediately if violated.",
    followUpHigh: "Outstanding answer! How does 'std::vector::push_back' use 'std::is_nothrow_move_constructible' to decide whether to move or copy elements during reallocation?",
    followUpLow: "Think about transactions: Strong guarantee means all-or-nothing rollback. Basic means no memory leaks. Nothrow means zero exceptions.",
    rubricCriteria: {
      basic: "Explains basic guarantee (no leaks, valid state)",
      strong: "Explains strong guarantee (commit-or-rollback)",
      nothrow: "Explains nothrow guarantee and noexcept optimization"
    }
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTION_BANK, SYLLABUS_UNITS, CODE_SNIPPETS };
}
