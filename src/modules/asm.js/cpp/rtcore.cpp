#include<stdio.h>

struct float3 {
  float3() {}
  float3(float xx, float yy, float zz) {
    v[0] = xx;
    v[1] = yy;
    v[2] = zz;
  }
  explicit float3(const float *p) {
    v[0] = p[0];
    v[1] = p[1];
    v[2] = p[2];
  }

  inline float x() const { return v[0]; }
  inline float y() const { return v[1]; }
  inline float z() const { return v[2]; }

  float3 operator*(float f) const { return float3(x() * f, y() * f, z() * f); }
  float3 operator-(const float3 &f2) const {
    return float3(x() - f2.x(), y() - f2.y(), z() - f2.z());
  }
  float3 operator*(const float3 &f2) const {
    return float3(x() * f2.x(), y() * f2.y(), z() * f2.z());
  }
  float3 operator+(const float3 &f2) const {
    return float3(x() + f2.x(), y() + f2.y(), z() + f2.z());
  }
  float3 &operator+=(const float3 &f2) {
    v[0] += f2.x();
    v[1] += f2.y();
    v[2] += f2.z();
    return (*this);
  }
  float3 operator/(const float3 &f2) const {
    return float3(x() / f2.x(), y() / f2.y(), z() / f2.z());
  }
  float operator[](int i) const { return v[i]; }
  float &operator[](int i) { return v[i]; }

  float3 neg() { return float3(-x(), -y(), -z()); }

  float length() { return sqrtf(x() * x() + y() * y() + z() * z()); }

  void normalize() {
    float len = length();
    if (fabsf(len) > 1.0e-6f) {
      float inv_len = 1.0f / len;
      v[0] *= inv_len;
      v[1] *= inv_len;
      v[2] *= inv_len;
    }
  }

  float v[3];
  // float pad;  // for alignment
};

inline float3 operator*(float f, const float3 &v) {
  return float3(v.x() * f, v.y() * f, v.z() * f);
}

inline float3 vcross(float3 a, float3 b) {
  float3 c;
  c[0] = a[1] * b[2] - a[2] * b[1];
  c[1] = a[2] * b[0] - a[0] * b[2];
  c[2] = a[0] * b[1] - a[1] * b[0];
  return c;
}

inline float vdot(float3 a, float3 b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

typedef struct {
  float t;
  float u;
  float v;
  unsigned int faceID;
} Intersection;

typedef struct {
  float org[3];     // must set
  float dir[3];     // must set
  float minT;       // minium ray hit distance. must set.
  float maxT;       // maximum ray hit distance. must set.
  float invDir[3];  // filled internally
  int dirSign[3];   // filled internally
} Ray;


int main() {
  printf("Ray Tracer Core (rv 0.1)!\n");
  return 0;
}
extern "C" loadModel(unsigned char *data){
    //data format
    //num geometries
    //for each geometry
    //  int material index
    //  int num vertices
    //  float3[] vertices
    //  float3[] normals
    //  int num indices
    //  int[] indices
}
