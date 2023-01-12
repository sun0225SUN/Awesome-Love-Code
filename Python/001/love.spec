# -*- mode: python -*-

block_cipher = None


a = Analysis(['love.py'],
             pathex=['/Users/MING/.virtualenvs/PythonCodingTime-8iFaVP-J/', '/Users/MING/Github/love-with-python/be_my_girlfriend_mac'],
             binaries=[],
             datas=[('01.ming','.'),('PingFang.ttc','PingFang.ttc')],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher)
             
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          name='love',
          debug=False,
          strip=False,
          upx=True,
          runtime_tmpdir=None,
          console=False )
