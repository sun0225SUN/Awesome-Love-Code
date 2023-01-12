f=@(x,y,z)(x.^2+ (9./4).*y.^2 + z.^2 - 1).^3 - x.^2.*z.^3 - (9./80).*y.^2.*z.^3;
[x,y,z]=meshgrid(linspace(-1.5,1.5));
val=f(x,y,z);
isosurface(x,y,z,val,0); 
axis equal;view(3);colormap([1 0.2 0.2])
