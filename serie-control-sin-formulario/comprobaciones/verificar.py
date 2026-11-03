import sympy as sp
from math import pi, exp, sqrt, log, atan2, degrees
s,t=sp.symbols('s t'); a,k,b,w=sp.symbols('a k b omega',positive=True)
L=lambda f: sp.simplify(sp.laplace_transform(f,t,s,noconds=True))
print("== Laplace")
for f in [sp.exp(-a*t), sp.Integer(1), t, t*sp.exp(-a*t), sp.sin(w*t), sp.cos(w*t), sp.exp(-a*t)*sp.sin(w*t), sp.exp(-a*t)*sp.cos(w*t)]:
    print(f, '->', L(f))
Y=1/(s*(s+1)*(s+2)); print("FP:", sp.apart(Y), '| y(t)=', sp.inverse_laplace_transform(Y,s,t))
print("valor final:", sp.limit(s*Y,s,0))
print("2/(s(s+2)) ->", sp.apart(2/(s*(s+2))), "| 6/(s(s+3)) vf", sp.limit(s*6/(s*(s+3)),s,0))
print("== Primer orden")
print("1-e^-1=%.4f 1-e^-3=%.4f 1-e^-4=%.4f"%(1-exp(-1),1-exp(-3),1-exp(-4)))
print("4/(s+2): K=2 tau=0.5 ts=",4*0.5)
print("== Segundo orden: examen Q1")
P={'s1':(-2,4),'s2':(-4,8),'s3':(-4,4),'s4':(-2,8),'s5':(-8,4)}
for n,(re,im) in P.items():
    sig=-re; wn=sqrt(sig**2+im**2); z=sig/wn; Mp=exp(-pi*sig/im)
    print(n, "wn=%.3f z=%.3f beta=%.1f Mp=%.2f%% tp=%.3f ts=%.3f"%(wn,z,degrees(atan2(im,sig)),100*Mp,pi/im,4/sig))
print("== Tabla Mp(zeta)")
for z in [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.707,0.8,0.9]:
    print(" z=%.3f Mp=%.1f%% beta=%.1f"%(z,100*exp(-pi*z/sqrt(1-z*z)),degrees(sp.acos(z))))
for Mp in [0.5,0.2,0.1,0.05]:
    lz=-log(Mp); print(" Mp=%.2f -> zeta=%.4f"%(Mp, lz/sqrt(pi**2+lz**2)))
print("== ER3b")
for n,(re,im) in {'a':(-1,8),'b':(-4,4),'c':(-8,1),'d':(-2,2)}.items():
    print(n,"Mp=%.3f%% ts=%.2f"%(100*exp(-pi*(-re)/im),4/(-re)))
for n,(re,im) in {'a':(-10,1),'b':(-5,5),'c':(-1,10),'d':(-8,2)}.items():
    print(" ymax",n,"%.4f"%(1+exp(-pi*(-re)/im)))
print("== ER2 (kf,kp,kd)")
R=sp.symbols('R'); kp,kd,kf,aa=sp.symbols('k_p k_d k_f a')
Yv,E2=sp.symbols('Y E2')
# x = salida de 1/(s+a); Y = x/s ; x(s+a) = kp(R-Y)+kf R - kd x
x=sp.symbols('x')
sol=sp.solve([sp.Eq(x*(s+aa), kp*(R-Yv)+kf*R-kd*x), sp.Eq(Yv, x/s)],[x,Yv])
T=sp.simplify(sol[Yv]/R); print("Y/R=",sp.factor(T))
print(" a (kd=1,kp=5,zeta=.6)=", sp.N(2*0.6*sp.sqrt(5)-1,5), "| kd(a=1)=",sp.N(2*0.6*sp.sqrt(5)-1,5)," | crit estable kd=",-1," | crit amort kd=",sp.N(2*sp.sqrt(5)-1,5))
print("== Integrador 2025 Q1")
r,y,u,x2,A_,B_=sp.symbols('r y u x2 A B')
k1=k2=5
# u=k1(r-y)-k2 x2 ; s x2 = b u - a x2 ; s y = x2
sol=sp.solve([sp.Eq(u,k1*(R-Yv)-k2*x2), sp.Eq(s*x2, b*u-aa*x2), sp.Eq(s*Yv,x2)],[u,x2,Yv])
T=sp.factor(sp.simplify(sol[Yv]/R)); print(" Y/R=",T)
print(" sol a,b:", sp.solve([sp.Eq(aa+5*b,2),sp.Eq(5*b,1)],[aa,b]))
print("== Integrador 2025 Q2: G=k/(s(s+a)) rampa")
print(sp.solve([sp.Eq(aa/k,sp.Rational(1,2)), sp.Eq(aa, 2*sp.Rational(1,2)*sp.sqrt(k))],[aa,k]))
print("== Integrador 2025 Q3: s^2+5s+4+k  sigma=",5/2," ts=",4/2.5)
print("== Mason examen 2026")
G2=k/s; G5=1/s; H2=1/(s+a); G1=G3=G4=H1=H3=1
U,e1,A,Bn,e2,C,Yy=sp.symbols('U e1 A Bn e2 C Yy')
eqs=[sp.Eq(A, G1*U - H1*Bn - H2*Yy), sp.Eq(Bn, G2*A), sp.Eq(C, G5*(A - H3*C)), sp.Eq(Yy, G4*(G3*Bn + C))]
so=sp.solve(eqs,[A,Bn,C,Yy]); Tn=sp.factor(sp.simplify(so[Yy]/U)); print(" T=",Tn)
num,den=sp.fraction(sp.together(Tn)); print(" den expand:", sp.Poly(sp.expand(den),s).all_coeffs())
L1=-G2*H1;L2=-G2*G3*G4*H2;L3=-G5*G4*H2;L4=-H3*G5
D=1-(L1+L2+L3+L4)+(L1*L4+L2*L4); Tm=(G1*G2*G3*G4*(1-L4)+G1*G5*G4)/D
print(" Mason == nodos:", sp.simplify(Tm-so[Yy]/U)==0)
print("== Routh")
def routh(c):
    c=[sp.nsimplify(x) for x in c]; n=len(c)
    rows=[c[0::2],c[1::2]]; w=len(rows[0])
    rows=[r+[0]*(w-len(r)) for r in rows]
    for i in range(2,n):
        p=rows[-2];q=rows[-1]; new=[]
        for j in range(w-1):
            new.append(sp.simplify((q[0]*p[j+1]-p[0]*q[j+1])/q[0]))
        new.append(0); rows.append(new)
    return [r[0] for r in rows]
for c in [[1,3,1,8,8],[1,5,2,3,4,10],[1,10,1,2],[1,6,5,30]]:
    fc=routh(c); print(c, fc, [complex(z) for z in sp.Poly(c,s).nroots()])
kk=sp.symbols('k')
print(" Ej42 s^3+3s^2+3s+1+k:", routh([1,3,3,1+kk]))
print(" Ej47 s^3+6s^2+5s+2k:", routh([1,6,5,2*kk]))
Kc=15; wosc=sqrt(5); Pc=2*pi/wosc; print("  Kc=15 w=%.3f Pc=%.3f kp=%.1f Ti=%.3f Td=%.3f"%(wosc,Pc,0.6*Kc,Pc/2,Pc/8))
print(" Ej42 ess=0.1 escalon -> k:", sp.solve(sp.Eq(1/(1+kk),sp.Rational(1,10)),kk))
print(" Examen Q2 Routh:", routh([1,a+k+1,a*k+2*k+1+a,(a+1)*k]))
print(sp.expand((a+k+1)*(a*k+2*k+1+a)-(a+1)*k))
print("== Variables de estado")
Am=sp.Matrix([[0,1],[-2,-3]]);Bm=sp.Matrix([0,1]);Cm=sp.Matrix([[3,0]])
print(" C(sI-A)^-1B =", sp.simplify((Cm*(s*sp.eye(2)-Am).inv()*Bm)[0]), " det=",sp.factor((s*sp.eye(2)-Am).det()))
k1s,k2s,k3s=sp.symbols('k1 k2 k3')
K=sp.Matrix([[k1s,k2s]])
A4=sp.Matrix([[0,1],[0,0]]); ch=sp.expand((s*sp.eye(2)-(A4-Bm*K)).det()); print(" ER4 char:",ch, sp.solve(sp.Poly(ch-sp.expand((s+2)**2+4),s).all_coeffs(),[k1s,k2s]))
Tcl=sp.simplify((sp.Matrix([[1,0]])*(s*sp.eye(2)-(A4-Bm*sp.Matrix([[8,4]]))).inv()*Bm)[0]); print("  ER4 T(s)=",Tcl," yss=",Tcl.subs(s,0)," ess=",1-Tcl.subs(s,0))
A5=sp.Matrix([[0,1],[0,-b]]); print(" ER5 G=",sp.simplify((sp.Matrix([[1,0]])*(s*sp.eye(2)-A5).inv()*Bm)[0]))
ch=sp.expand((s*sp.eye(2)-(A5-Bm*K)).det()); print("  ER5 char:",ch, sp.solve(sp.Poly(ch-sp.expand((s+2*b)**2),s).all_coeffs(),[k1s,k2s]))
Tcl=sp.simplify(k3s*(sp.Matrix([[1,0]])*(s*sp.eye(2)-(A5-Bm*sp.Matrix([[4*b**2,3*b]]))).inv()*Bm)[0]); print("  ER5 T=",sp.factor(Tcl)," k3 para ess=0:",sp.solve(sp.Eq(Tcl.subs(s,0),1),k3s))
p1,p2,p3,c1,c2,c3,bb=sp.symbols('p1 p2 p3 c1 c2 c3 b')
A6=sp.diag(-p1,-p2,-p3);B6=sp.Matrix([1,1,1]);C6=sp.Matrix([[c1,c2,c3]])
print(" Prueba: G=",sp.simplify((C6*(s*sp.eye(3)-A6).inv()*B6)[0]+bb), " det=",sp.factor((s*sp.eye(3)-A6).det()))
print("== Ej.27 diseño: s^2+8s+32 -> wn=%.3f z=%.3f Mp=%.2f%% tp=%.3f ts=%.2f"%(sqrt(32),4/sqrt(32),100*exp(-pi),pi/4,1))
print("== Inversa 2x2: [[a,b],[c,d]]^-1 =", sp.Matrix([[sp.Symbol('a'),sp.Symbol('b')],[sp.Symbol('c'),sp.Symbol('d')]]).inv())
