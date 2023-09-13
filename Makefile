DIR=$(strip $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST)))))

BASE_HREF=/

## Команда по умолчанию.
default: help

## Загрузка зависимостей.
dep:
	@npm_config_loglevel=silent npm install
	@npm_config_loglevel=silent npm install webp-converter@2.2.3 --save-dev
.PHONY: dep

## Сборка в продакшн режиме.
build: clean-pre-build
	@bash -c "echo -n 'npm: '"; npm -v
	@bash -c "echo -n 'nodejs: '"; node -v
	@npm run postinstall
	@npm run build-dist
.PHONY: build

## Сборка в режиме разработки с запуском локального web сервера.
dev: clean-pre-build
	clear
	@npm run postinstall
	@npm_config_loglevel=silent npm cache clean --force
	@npm run build
.PHONY: dev

## Удаление текущего файла fonts.scss, удаление всех кешей шрифтов, повторное создание шрифтов.
fonts:
	clear
	@rm -rf ${DIR}/.tmp/fonts; true
	@rm -rf ${DIR}/build/fonts; true
	@rm -rf ${DIR}/src/scss/fonts.scss; true
	@npm run fonts
.PHONY: fonts

## Генерация SVG спрайта из SVG картинок размещённых в директории src/svg-icon.
sprite:
	clear
	@rm -rf ${DIR}/build/img/sprite; true
	@rm -rf ${DIR}/build/img/stack; true
	@npm run sprite
.PHONY: sprite

## Обновление зависимостей.
update: upd
upd:
	@npm_config_loglevel=silent sudo npm cache clean --force
	@npm_config_loglevel=silent npm upgrade
	@npm_config_loglevel=silent npm install webp-converter@2.2.3 --save-dev
	@npm-check -u
.PHONY: upd
.PHONY: update

## Частичная очистка для режима сборки в режиме разработки.
clean-pre-build:
	@rm -rf ${DIR}/dist; true
	@rm -rf ${DIR}/npm-debug.log; true
.PHONY: clean-pre-build

## Очистка директории проекта от временных файлов.
clean: clean-pre-build
	@rm -rf ${DIR}/.tmp; true
	@rm -rf ${DIR}/build; true
	@rm -rf ${DIR}/node_modules; true
	@rm -rf ${DIR}/nohup.out; true
.PHONY: clean

## Помощь по командам.
help:
	@echo "Используйте: make [target]"
	@echo "  target - это:"
	@echo "    upd или update       - Обновление зависимостей до последних версий."
	@echo "    dep                  - Загрузка и обновление зависимостей проекта."
	@echo "    build                - Сборка проекта в режиме 'продакшн'."
	@echo "    dev                  - Сборка проекта в режиме разработки с запуском локального веб сервера."
	@echo "    fonts                - Очистка созданных шрифтов и повторное создание шрифтов и файла fonts.scss"
	@echo "    sprite               - Генерация SVG спрайта из SVG картинок размещённых в директории src/svg-icon."
	@echo "    version              - Вывод на экран версии проекта."
	@echo "    clean                - Очистка директории проекта от временных файлов."
.PHONY: help
