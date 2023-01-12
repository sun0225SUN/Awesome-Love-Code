f=@(x,y,z)(x.^2+ (9./4).*y.^2 + z.^2 - 1).^3 - x.^2.*z.^3 - (9./80).*y.^2.*z.^3;
[x,y,z]=meshgrid(linspace(-3,3));
val=f(x,y,z);
[p,v]=isosurface(x,y,z,val,0);
patch('faces',p,'vertices',v,'facevertexcdata',jet(size(v,1)),'facecolor','w','edgecolor','flat');
view(3);grid on;axis equal;