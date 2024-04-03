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


def heading(title):
    width = 70
    print()
    print("-" * width)
    print(f"--> {title}")
    print("-" * width)


# Example usage:
# if __name__ == "__main__":
#     # Elliptic Curve: y^2 = x^3 + ax + b (mod p)
#     A = 0
#     B = 7
#     p = 115792089237316195423570985008687907853269984665640564039457584007908834671663
#
#     # Create an instance of the elliptic curve
#     curve = EllipticCurve(A, B, p)
#
#     # Define a base point (x, y) on the curve
#     x = 55066263022277343669578718895168534326250603453777594175500187360389116729240
#     y = 32670510020758816978083085130507043184471273380659243275938904335757337482424
#     point = (x, y)
#
#     q = 115792089237316195423570985008687907852837564279074904382605163141518161494337
#     privateKey = 1234567
#
#     # --------------------------------------------
#     # Calculate public key Y
#     # --------------------------------------------
#     publicKey = curve.scalar_multiplication(privateKey, point)
#     publicKey = (int(publicKey[0]), int(publicKey[1]))
#
#     heading("Compute Public Key")
#     print(f"x = {publicKey[0]}")
#     print(f"y = {publicKey[1]}")
#     # print(publicKey)
#
#     # --------------------------------------------
#     # Generate Signature - Generate document hash
#     # --------------------------------------------
#     # https://emn178.github.io/online-tools/sha1.html
#     hash = sha1(b"""Hello World!""").hexdigest()
#     hash = int(hash, 16)
#
#     heading("Generate Signature - SHA1 hash of the document (decimal)")
#     print(f"hash = {hash}")
#
#     # --------------------------------------------
#     # Generate Signature - Compute u
#     # --------------------------------------------
#     randomNumber = 123595555555
#     (u, v) = curve.scalar_multiplication(randomNumber, point)
#     u = int(u)
#     v = int(v)
#
#     heading("Generate Signature - Compute (u,v)")
#     print(f"u = {u}")
#     print(f"v = {v}")
#
#     # --------------------------------------------
#     # Generate Signature - Compute r = u (mod q)
#     # --------------------------------------------
#     r = u % q
#
#     heading("Generate Signature - Compute r = u (mod q)")
#     print(f"r = {r}")
#
#     # --------------------------------------------
#     # Generate Signature - Compute s = k^-1 (hash + xr) (mod q)
#     # --------------------------------------------
#     k_inv_mod_q = pow(randomNumber, -1, q)
#     xr_mod_q = (privateKey * r) % q
#     xr_mod_q = (xr_mod_q + hash) % q
#
#     s = (k_inv_mod_q * xr_mod_q) % q
#
#     heading("Generate Signature - Compute s = k^-1 (hash + xr) (mod q)")
#     print(f"s = {s}")
#
#     # --------------------------------------------
#     # Generated Signature (s,r)
#     # --------------------------------------------
#     heading("Generated Signature (s,r)")
#     print(f"s = {s}")
#     print(f"r = {r}")
#
#     # --------------------------------------------
#     # Verify Signature  m,(r,s)
#     # --------------------------------------------
#     s_inv_mod_q = pow(s, -1, q)
#
#     i = (hash * s_inv_mod_q) % q
#     j = (r * s_inv_mod_q) % q
#
#     heading("Verify Signature - Computing i & j")
#     print(f"i = {i}")
#     print(f"j = {j}")
#
#     (ix, iy) = curve.scalar_multiplication(i, point)
#     ix = int(ix)
#     iy = int(iy)
#
#     heading("Verify Signature - Computing i * alpha")
#     print(f"ix = {ix}")
#     print(f"iy = {iy}")
#
#     (jx, jy) = curve.scalar_multiplication(j, publicKey)
#     jx = int(jx)
#     jy = int(jy)
#
#     heading("Verify Signature - Computing j * Y")
#     print(f"jx = {jx}")
#     print(f"jy = {jy}")
#
#     (uVerify, vVefiry) = curve.point_addition((ix, iy), (jx, jy))
#     uVerify = int(uVerify)
#     vVefiry = int(vVefiry)
#
#     heading("Verify Signature - Computing (i * alpha) + (j * Y)")
#     print(f"u = {uVerify}")
#     print(f"y = {vVefiry}")
#
#     rVerify = uVerify % q
#
#     heading("Verify Signature - rVerify == rSignature")
#     print(f"rVerify    = {rVerify}")
#     print(f"rSignature = {r}")
#     if rVerify == r:
#         print("Valid signature ✅")
#     else:
#         print("Invalid signature ❌")
