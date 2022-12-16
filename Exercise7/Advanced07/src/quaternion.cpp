#include "quaternion.h"


Quaternion::Quaternion()
{
    real = 1;
    img = vec3(0);
}

Quaternion::Quaternion(vec3 axis, float angle)
{
    // TODO 7.3 a)
    // Initialize with classic axis angle rotation as defined in the lecture.
	// Change the following two lines!
    //float convAngle = (angle / (2 * pi<float>())) * 360;
	real = cos(angle / 2);
	img = vec3(axis.x * sin(angle / 2),
        axis.y * sin(angle / 2),
        axis.z * sin(angle / 2));
}



mat3 Quaternion::toMat3()
{
    // Conversion Quaternion -> mat3
    // You won't have to implement it this year :).
    mat3 Result;
    float qxx(img.x * img.x);
    float qyy(img.y * img.y);
    float qzz(img.z * img.z);
    float qxz(img.x * img.z);
    float qxy(img.x * img.y);
    float qyz(img.y * img.z);
    float qwx(real * img.x);
    float qwy(real * img.y);
    float qwz(real * img.z);

    Result[0][0] = float(1) - float(2) * (qyy +  qzz);
    Result[0][1] = float(2) * (qxy + qwz);
    Result[0][2] = float(2) * (qxz - qwy);

    Result[1][0] = float(2) * (qxy - qwz);
    Result[1][1] = float(1) - float(2) * (qxx +  qzz);
    Result[1][2] = float(2) * (qyz + qwx);

    Result[2][0] = float(2) * (qxz + qwy);
    Result[2][1] = float(2) * (qyz - qwx);
    Result[2][2] = float(1) - float(2) * (qxx +  qyy);
    return Result;
}

mat4 Quaternion::toMat4()
{
    return mat4(toMat3());
}


float Quaternion::norm() const
{
    // TODO 7.3 b)
    // Compute the L2 norm of this vector.
    return sqrt(dot(*this, *this));
}

Quaternion Quaternion::normalize()
{
    // TODO 7.3 b)
    // Normalize this quaternion.
    float sum = sqrt(pow(this->real, 2) + pow(this->img.x, 2) +
        pow(this->img.y, 2) + pow(this->img.z, 2));
    this->real = this->real / sum;
    this->img.x = this->img.x / sum;
    this->img.y = this->img.y / sum;
    this->img.z = this->img.z / sum;
    return *this;
}

Quaternion Quaternion::conjugate() const
{
    // TODO 7.3 b)
	// Return the conjugate of this quaternion.
    Quaternion result;
    result.real = this->real;
    result.img = -this->img;
    return result;
}

Quaternion Quaternion::inverse() const
{
    // TODO 7.3 b)
	// Return the inverse of this quaternion.
    Quaternion result = this->conjugate();
    float divider = pow(this->norm(), 2);
    result.real = result.real / divider;
    result.img = result.img / divider;
    return result;
}



float dot(Quaternion x, Quaternion y)
{
    // TODO 7.3 b)
	// Compute the dot product of x and y.
    float realPart = x.real * y.real;
    float dotProdVectors = glm::dot(x.img, y.img);
    return realPart + dotProdVectors;
}



Quaternion operator*(Quaternion l, Quaternion r)
{
    // TODO 7.3 c)
    // Perform quaternion-quaternion multiplication as defined in the lecture.
	// Hint: You can use the glm function for vector products.
    Quaternion result;
    result.real = l.real * r.real - glm::dot(l.img, r.img);
    result.img = l.real * r.img + l.img * r.real + glm::cross(l.img, r.img);
    return result;
}

vec3 operator*(Quaternion l, vec3 r)
{
    // TODO 7.3 c)
    // Rotate the vector 'r' with the quaternion 'l'.
    Quaternion vector;
    vector.real = 0;
    vector.img = r;

    return ((l * vector) * l.inverse()).img;
}

Quaternion operator*(Quaternion l, float r)
{
    // TODO 7.3 c)
    // Perform quaternion-scalar multiplication.
    Quaternion result;
    result.real = l.real * r;
    result.img = l.img * r;
    return result;
}

Quaternion operator+(Quaternion l, Quaternion r)
{
    // TODO 7.3 c)
	// Return the sum of the two quaternions.
    Quaternion result;
    result.real = l.real + r.real;
    result.img = l.img + r.img;
    return result;
}



Quaternion slerp(Quaternion x, Quaternion y, float t)
{
	float epsilon = 0.00001;

    // TODO 7.3 d)
    // Spherical linear interpolation (slerp) of quaternions.

    // Compute the interpolated quaternion and return it normalized.
	
    Quaternion result;
    if (dot(x, y) > 1 - epsilon) {
        result = x * (1 - t) + y * t;
    }
    else {
        float sinAngle = 1 - pow(dot(x, y), 2);
        float angle = asin(sinAngle);
        result =  x * (sin((1 - t) * angle) / sinAngle)
            + y * (sin(t * angle) / sinAngle);
    }
    return result;
}

std::ostream& operator<<(std::ostream &str, Quaternion r)
{
    str << "( " << r.real << "," << r.img.x << "," << r.img.y << "," << r.img.z << " )";
        return str;
}
