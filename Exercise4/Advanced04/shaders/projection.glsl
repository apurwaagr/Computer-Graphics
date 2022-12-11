
vec3 projectVertexToPlane(vec3 vertex, vec3 direction, vec3 pointOnPlane, vec3 planeNormal)
{
    vec3 projectedPoint;
    // TODO 4.4 a)
    // Project 'vertex' on the plane defined by 'pointOnPlane' and 'planeNormal'.
    // The projection direction is given by 'direction'.

    // projectedPoint = vertex + (direction * x)
    // calc x!
    

    //Normalform in Koordinatenform
    //planeNormal[0] * x1 + planeNormal[1] * x2 + planeNormal[2] * x3 = z
    float z1 = - dot(planeNormal, pointOnPlane);
    float z = - z1;

    //Schnittpunkt Ebene Gerade
    // Gerade in Ebene einsetzen; Form: a + rb = z => ermittle r
    float a = planeNormal[0] * vertex[0] + planeNormal[1] * vertex[1] + planeNormal[2] * vertex[2];
    float b = planeNormal[0] * direction[0] + planeNormal[1] * direction[1] + planeNormal[2] * planeNormal[2];
    z = z - a;
    float r = z / b;

    vec3 correctDirection = (r * direction) + 0.1;
    projectedPoint = vertex + correctDirection; 

    return projectedPoint;
}

