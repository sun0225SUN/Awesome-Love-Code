function LoveFunc
LoveFunchdl=@(x,a)(x.^2).^(1/3)+0.9.*((3.3-x.^2).^(1/2)).*sin(a.*pi.*x);
hold on
grid on
axis([-3 3,-2 4])
x=-1.8:0.005:1.8;
text(0,3.3,'$f(x)=x^{\frac{2}{3}}+0.9(3.3-x^2)^{\frac{1}{2}}\sin(\alpha\pi x)$',...
    'FontSize',13,'HorizontalAlignment','center','Interpreter','latex');
txt2=text(-0.35,2.9,'','FontSize',13,'HorizontalAlignment','left','Interpreter','latex','tag','alphadata');
for a=1:0.01:20
    delete(findobj('type','line'))
    AlphaString=['$\alpha=',num2str(a),'$'];
    Color=([1.0000 0.4902 0.6627]-[0.2118 0.4667 0.9961]).*(a/20)+[0.2118 0.4667 0.9961];
    set(txt2,'string',AlphaString)
    plot(x,LoveFunchdl(x,a),'color',Color,'LineWidth',1.2);
    pause(0.003)
end
end
