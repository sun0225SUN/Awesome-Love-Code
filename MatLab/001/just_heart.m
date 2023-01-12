t=[0:0.1:2*pi]
x=16 * sin(t).^3
y=13 * cos(t) - 5 * cos(2 * t) - 2 * cos(3 * t) - cos(4 * t)
a=(x - min(x))/(max(x) - min(x))
b=(y - min(y))/(max(y) - min(y))
plot(x,y,'r')