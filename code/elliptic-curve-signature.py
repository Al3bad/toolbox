from sympy import mod_inverse
from hashlib import sha1


class EllipticCurve:
    def __init__(self, a, b, p):
        self.a = a
        self.b = b
        self.p = p

    def point_addition(self, P, Q):
        if P == "O":  # Point at infinity
            return Q
        if Q == "O":
            return P

        x1, y1 = P
        x2, y2 = Q

        if P == Q:
            lam = ((3 * x1**2 + self.a) * mod_inverse(2 * y1, self.p)) % self.p
        else:
            lam = ((y2 - y1) * mod_inverse(x2 - x1, self.p)) % self.p

        x3 = (lam**2 - x1 - x2) % self.p
        y3 = (lam * (x1 - x3) - y1) % self.p

        return x3, y3

    def point_doubling(self, P):
        return self.point_addition(P, P)

    def scalar_multiplication(self, k, P):
        Q = "O"
        while k > 0:
            if k % 2 == 1:
                Q = self.point_addition(Q, P)
            P = self.point_doubling(P)
            k //= 2
        return Q
