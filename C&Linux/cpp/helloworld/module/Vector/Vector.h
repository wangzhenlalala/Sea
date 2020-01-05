class Vector {
public:
    Vector(int s);
    ~Vector();
    double& operator[](int i);
    int size() const;
private:
    double* elem;
    int sz;
}; // 如果忘记加分号 -- cannot be defined in the result type of a function