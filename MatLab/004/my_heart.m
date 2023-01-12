[X,Y,Z] = meshgrid(-1.2:.02:1.2,-3:.03:3,-1:.02:1.3);
f = smooth3((X.^2+9*Y.^2/9+Z.^2-1).^3-X.^2.*Z.^3-Y.^2.*Z.^3/20,'gauss');
v = uniquetol(getfield(isosurface(X,Y,Z,f,0),'vertices'),.15,'byrows',1);
n = isonormals(X,Y,Z,f,v);
ar = bsxfun(@rdivide,n*[0 -1 0;1 0 0;0 0 0],sqrt(sum(n.^2,2)));

[x,t] = meshgrid(0:.125:1,(-2:.2:10)*pi);
[p,q] = deal(pi/2*exp(-t/(8*pi)),1-(1-mod(3.6*t,2*pi)/pi).^4/2);
y = 2*(x.^2-x).^2.*sin(p);
[p,q] = deal(q.*(x.*sin(p)+y.*cos(p)),q.*(x.*cos(p)-y.*sin(p)));

figure color w, axis image vis3d off
h = surface(p.*cos(t),p.*sin(t),q,'EdgeColor','n','FaceColor','r');
arrayfun(@(t,i)copyobj(h,hgtransform('Mat',makehgtform('translate',5*v(i,:),...
   'axisrotate',ar(i,:),t))),asin(sqrt(sum(ar.^2,2)))',1:size(v,1))
view(32,12), set(camlight('head'),'color',[1 0.84 0.6]), lighting gouraud