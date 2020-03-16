class Vector {
public:
    Vector(int s);
    Vector(Vector& a); // copy constructor
    explicit Vector(int s);
    ~Vector();
    Vector& operator=(Vector& a); // copy assignment
    double& operator[](int i);
    int size() const;
private:
    double* elem;
    int sz;
}; // 如果忘记加分号 -- cannot be defined in the result type of a function