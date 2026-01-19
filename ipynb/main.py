import matplotlib.pyplot as plt

def f(x):
    return 4 * x**3 - x

exact = 1/2
# 区分求積法（左端）
def integral_riemann(f, a, b, N):
    width = (b - a) / N
    area = 0.0
    for i in range(N):
        x = a + i * width
        area += f(x) * width
    return area

Ns = [1000, 3000, 10000, 30000]

# 誤差を計算
errors = []
for N in Ns:
    approx = integral_riemann(f, 0, 1, N)
    err = abs(approx - exact)
    errors.append(err)

fig, ax = plt.subplots()
ax.plot(Ns, errors, marker="o")
ax.set_xlabel("N (number of subintervals)")
ax.set_ylabel("Error |approx - exact|")
ax.set_title("Riemann sum error for $∫_0^1 x^3 dx$")
ax.grid(True)
# plt.show()
fig.savefig("plot.png")