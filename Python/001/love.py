# coding:utf-8
import sys
import os
import random
import pygame
from pygame.locals import *


WIDTH, HEIGHT = 640, 480
BACKGROUND = (255, 255, 255)

def button(text, x, y, w, h, color, screen, size):
	pygame.draw.rect(screen, color, (x, y, w, h))
	font = pygame.font.Font('carton.ttf', size)
	textRender = font.render(text, True, (0, 0, 0))
	textRect = textRender.get_rect()
	textRect.center = ((x+w/2), (y+h/2))
	screen.blit(textRender, textRect)


def title(text, screen, scale, color=(0, 0, 0)):
	font = pygame.font.Font('carton.ttf', WIDTH//(len(text)*2))
	textRender = font.render(text, True, color)
	textRect = textRender.get_rect()
	textRect.midtop = (WIDTH/scale[0], HEIGHT/scale[1])
	screen.blit(textRender, textRect)


def get_random_pos():
	x, y = random.randint(20, 620), random.randint(20, 460)
	return x, y


def show_like_interface(text, screen, color=(255, 0, 0)):
	screen.fill(BACKGROUND)
	font = pygame.font.Font('carton.ttf', WIDTH//(len(text)))
	textRender = font.render(text, True, color)
	textRect = textRender.get_rect()
	textRect.midtop = (WIDTH/2, HEIGHT/2)
	screen.blit(textRender, textRect)
	pygame.display.update()
	while True:
		for event in pygame.event.get():
			if event.type == QUIT:
				pygame.quit()
				sys.exit()

def show_like_interface1(screen):
	screen.fill(BACKGROUND)
	img3 = pygame.image.load("3.png")
	imgRect = img3.get_rect()
	imgRect.midtop = WIDTH // 2, HEIGHT // 4
	screen.blit(img3, imgRect)
	pygame.display.update()
	while True:
		for event in pygame.event.get():
			if event.type == QUIT:
				pygame.quit()
				sys.exit()

def show_like_interface2(text, screen, color=(255, 0, 0)):
	screen.fill(BACKGROUND)
	font = pygame.font.Font('carton.ttf', WIDTH//(len(text)))
	textRender = font.render(text, True, color)
	textRect = textRender.get_rect()
	textRect.midtop = (WIDTH/2, HEIGHT/2)
	screen.blit(textRender, textRect)
	pygame.display.update()
	while True:
		for event in pygame.event.get():
			if event.type == QUIT:
					pygame.quit()
					sys.exit()


def main():
	pygame.init()
	screen = pygame.display.set_mode((WIDTH, HEIGHT), 0, 32)
	pygame.display.set_caption('来自一个喜欢你很久的小哥哥')
	clock = pygame.time.Clock()
    
	unlike_x_pos,unlike_y_pos = 370,380
	unlike_pos_width, unlike_pos_height = 100,50
	like_x_pos,like_y_pos = 180,370
	like_pos_width,like_pos_height = 100,50

	running = True
	button_color = (192, 192, 192)
	while running:
		screen.fill(BACKGROUND)
		img = pygame.image.load("1.png")
		imgRect = img.get_rect()
		imgRect.midtop = WIDTH//2, HEIGHT//4
		screen.blit(img, imgRect)
		for event in pygame.event.get():
			if event.type == pygame.MOUSEBUTTONDOWN:
				mouse_pos = pygame.mouse.get_pos()
				if mouse_pos[0] < like_x_pos+like_pos_width+5 and mouse_pos[0] > like_x_pos-5 and\
					mouse_pos[1] < like_y_pos+like_pos_height+5 and mouse_pos[1] > like_y_pos-5:
					button_color = BACKGROUND
					running = False
		mouse_pos = pygame.mouse.get_pos()
		if mouse_pos[0] < unlike_x_pos+unlike_pos_width+5 and mouse_pos[0] > unlike_x_pos-5 and\
			mouse_pos[1] < unlike_y_pos+unlike_pos_height+5 and mouse_pos[1] > unlike_y_pos-5:
			while True:
				unlike_x_pos, unlike_y_pos = get_random_pos()
				if mouse_pos[0] < unlike_x_pos+unlike_pos_width+5 and mouse_pos[0] > unlike_x_pos-5 and\
					mouse_pos[1] < unlike_y_pos+unlike_pos_height+5 and mouse_pos[1] > unlike_y_pos-5:
					continue
				break
		title('小姐姐，我观察你很久了', screen, scale=[2, 10])
		title('做我女朋友好不好呀? *^_^*', screen, scale=[2, 6])
		button('好呀', like_x_pos, like_y_pos, like_pos_width, like_pos_height, button_color, screen, 20)
		button('算了吧', unlike_x_pos, unlike_y_pos, unlike_pos_width/2, unlike_pos_height/2, button_color, screen, 10)
		pygame.display.flip()
		pygame.display.update()
		clock.tick(60)

	if not os.path.exists("3.png"):
		show_like_interface2('我就知道小姐姐你也喜欢我 *^_^*', screen, color=(0, 0, 0))
	else:
		show_like_interface1(screen=screen)

if __name__ == '__main__':
	main()